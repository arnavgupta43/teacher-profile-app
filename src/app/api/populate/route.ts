import { NextResponse } from "next/server";
import Teachers from "@/models/teacherModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET() {
  try {
    await connect();
    const teachersData = [
      {
        username: "amit_sharma",
        name: "Dr. Amit Sharma",
        email: "amit.sharma@example.com",
        passwordHash: "password123",
        profile: {
          age: 42,
          mobileNo: "9876543210",
          address: "Christ University, Bengaluru",
          previousExperience: "5 years as Assistant Professor at IIT Bombay",
          researchInterests: [
            "Machine Learning",
            "Artificial Intelligence",
            "Natural Language Processing",
          ],
          publications: [
            "A Novel Approach to Sentiment Analysis, IEEE 2022",
            "Deep Learning for Image Recognition, Springer 2021",
          ],
        },
      },
      {
        username: "priya_singh",
        name: "Prof. Priya Singh",
        email: "priya.singh@example.com",
        passwordHash: "password123",
        profile: {
          age: 38,
          mobileNo: "9123456789",
          address: "Christ University, Bengaluru",
          previousExperience: "Research Scientist at ISRO for 3 years",
          researchInterests: [
            "Data Science",
            "Big Data Analytics",
            "Cloud Computing",
          ],
          publications: [
            "Scalable Data Processing Frameworks, ACM 2020",
            "Predictive Modeling in Healthcare, Elsevier 2019",
          ],
        },
      },
      {
        username: "rahul_verma",
        name: "Dr. Rahul Verma",
        email: "rahul.verma@example.com",
        passwordHash: "password123",
        profile: {
          photo: "",
          age: 55,
          mobileNo: "9988776655",
          address: "Christ University, Bengaluru",
          previousExperience:
            "10 years at University of Delhi as Head of Department",
          researchInterests: [
            "Cybersecurity",
            "Network Security",
            "Cryptography",
          ],
          publications: [
            "Advanced Encryption Standards, Wiley 2018",
            "Intrusion Detection Systems using AI, IEEE 2021",
          ],
        },
      },
      {
        username: "sunita_reddy",
        name: "Prof. Sunita Reddy",
        email: "sunita.reddy@example.com",
        passwordHash: "password123",
        profile: {
          age: 45,
          mobileNo: "9000011111",
          address: "Christ University, Bengaluru",
          previousExperience: "8 years as a Senior Lecturer at VIT Vellore",
          researchInterests: [
            "Software Engineering",
            "Agile Methodologies",
            "Software Testing",
          ],
          publications: [
            "A Comparative Study of Agile and Waterfall Models, 2019",
            "Automated Software Testing Techniques, 2022",
          ],
        },
      },
      {
        username: "vikas_patel",
        name: "Dr. Vikas Patel",
        email: "vikas.patel@example.com",
        passwordHash: "password123",
        profile: {
          age: 35,
          mobileNo: "8887776665",
          address: "Christ University, Bengaluru",
          previousExperience: "Post-doctoral fellow at IISc Bangalore",
          researchInterests: [
            "Internet of Things (IoT)",
            "Embedded Systems",
            "Wireless Sensor Networks",
          ],
          publications: [
            "Low-Power Communication Protocols for IoT, 2023",
            "Security Challenges in IoT Devices, 2021",
          ],
        },
      },
    ];

    const teacherOne = await Teachers.create(teachersData);
    return NextResponse.json({ success: true, data: teacherOne });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
