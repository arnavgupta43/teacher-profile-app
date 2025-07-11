"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  FileText,
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
const TeacherProfile = () => {
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    fetchTeacherProfile();
  }, []);

  const fetchTeacherProfile = async () => {
    try {
      const response = await fetch("/api/teacher/dashboard", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch teacher profile");
      }

      const data = await response.json();
      setTeacher(data.teacher);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={fetchTeacherProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No teacher profile found</p>
      </div>
    );
  }

  const calculateAge = (birthAge: any) => {
    return birthAge || "N/A";
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
              <span
                className="text-xl font-bold text-gray-900 cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                EduConnect
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Courses
              </a>
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {teacher.name?.charAt(0) || "T"}
                </span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Profile Header */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-6">
                  {teacher.profile?.photo ? (
                    <img
                      src={teacher.profile.photo}
                      alt={teacher.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-blue-600" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {teacher.name}
                  </h1>
                  <p className="text-gray-600 mb-2">
                    Professor of Computer Science
                  </p>
                  <p className="text-blue-600 text-sm">
                    Ph.D., {teacher.profile?.address || "University"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              {["about", "research", "publications", "courses"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="px-6 py-6">
            {activeTab === "about" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Biography
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {teacher.name} is a distinguished professor at{" "}
                    {teacher.profile?.address || "the University"}.
                    {teacher.profile?.previousExperience && (
                      <span>
                        {" "}
                        With extensive experience in{" "}
                        {teacher.profile.previousExperience}, they have made
                        significant contributions in their respective field
                      </span>
                    )}
                    {teacher.profile?.researchInterests?.length > 0 && (
                      <span>
                        {" "}
                        Their research focuses on{" "}
                        {teacher.profile.researchInterests
                          .join(", ")
                          .toLowerCase()}
                        .
                      </span>
                    )}
                  </p>
                </div>

                {teacher.profile?.researchInterests?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Research Interests
                    </h2>
                    <p className="text-gray-700">
                      {teacher.name}'s research interests include{" "}
                      {teacher.profile.researchInterests
                        .join(", ")
                        .toLowerCase()}
                      , and their applications in various domains.
                    </p>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Contact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Office</h3>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {teacher.profile?.address || "University Campus"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                      <p className="text-gray-600 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {teacher.email}
                      </p>
                    </div>
                    {teacher.profile?.mobileNo && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">
                          Phone
                        </h3>
                        <p className="text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {teacher.profile.mobileNo}
                        </p>
                      </div>
                    )}
                    {teacher.profile?.age && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Age</h3>
                        <p className="text-gray-600">
                          {calculateAge(teacher.profile.age)} years
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "research" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Research Interests
                </h2>
                {teacher.profile?.researchInterests?.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 mb-4">
                      {teacher.name}'s research interests span across multiple
                      areas of computer science:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teacher.profile.researchInterests.map(
                        (interest, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 p-4 rounded-lg"
                          >
                            <div className="flex items-center">
                              <Award className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="font-medium text-gray-900">
                                {interest}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    {teacher.profile?.previousExperience && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Previous Experience
                        </h3>
                        <p className="text-gray-700">
                          {teacher.profile.previousExperience}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No research interests specified.
                  </p>
                )}
              </div>
            )}

            {activeTab === "publications" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Publications
                </h2>
                {teacher.profile?.publications?.length > 0 ? (
                  <div className="space-y-4">
                    {teacher.profile.publications.map((publication, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {publication}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              Published research work
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No publications available.
                  </p>
                )}
              </div>
            )}

            {activeTab === "courses" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Courses
                </h2>
                <p className="text-gray-500 italic">
                  Course information will be displayed here once the courses
                  module is implemented.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
