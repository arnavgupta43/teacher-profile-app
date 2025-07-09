import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import Busboy from "busboy";
import { Readable } from "stream";
export const dynamic = "force-dynamic";
export async function POST(req) {
  //setup the s3 configurations
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const headers = Object.fromEntries(req.headers);
  const busboy = Busboy({ headers });
  let fileBuffer = [];
  let fileName = "";
  let fileType = "";
  return new Promise((resolve, reject) => {
    //process the image into dstream
    busboy.on("file", (fieldname, file, info) => {
      fileName = `${randomUUID()}-${info.filename}`;
      fileType = info.mimeType;
      file.on("data", (data) => fileBuffer.push(data));
    });
    //push into a final buffer
    busboy.on("finish", async () => {
      const finalBuffer = Buffer.concat(fileBuffer);
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: finalBuffer,
        ContentType: fileType,
      };

      try {
        //sent the image
        await s3.send(new PutObjectCommand(uploadParams));
        const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        console.log(imageUrl);
        resolve(NextResponse.json({ imageUrl }));
      } catch (error) {
        console.error("S3 Upload Error:", error);
        reject(
          NextResponse.json({ error: "S3 upload failed" }, { status: 500 })
        );
      }
    });
    Readable.fromWeb(req.body).pipe(busboy);
  });
}
