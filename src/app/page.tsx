"use client";

import { useState } from "react";
import { Menu, X, BookOpen, Users, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-xl font-bold text-gray-900 cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                EduConnect
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contact
              </a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                About
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Contact
              </a>
              <button className="w-full text-left px-3 py-2 text-blue-600 font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 mt-11 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-3xl p-8 relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/30 rounded-full blur-lg"></div>

              {/* Illustration Container */}
              <div className="relative z-10 flex flex-col items-center space-y-6">
                {/* Standing figures */}
                <div className="flex justify-center space-x-4 mb-4">
                  {/* Figure 1 */}
                  <div
                    className="animate-bounce"
                    style={{ animationDelay: "0s", animationDuration: "3s" }}
                  >
                    <div className="w-16 h-20 relative">
                      <div className="w-8 h-8 bg-amber-200 rounded-full mx-auto mb-2"></div>
                      <div className="w-12 h-12 bg-teal-500 rounded-t-xl mx-auto"></div>
                    </div>
                  </div>

                  {/* Figure 2 */}
                  <div
                    className="animate-bounce"
                    style={{ animationDelay: "0.5s", animationDuration: "3s" }}
                  >
                    <div className="w-16 h-20 relative">
                      <div className="w-8 h-8 bg-amber-700 rounded-full mx-auto mb-2"></div>
                      <div className="w-12 h-12 bg-yellow-600 rounded-t-xl mx-auto"></div>
                    </div>
                  </div>

                  {/* Figure 3 */}
                  <div
                    className="animate-bounce"
                    style={{ animationDelay: "1s", animationDuration: "3s" }}
                  >
                    <div className="w-16 h-20 relative">
                      <div className="w-8 h-8 bg-amber-300 rounded-full mx-auto mb-2"></div>
                      <div className="w-12 h-12 bg-blue-400 rounded-t-xl mx-auto"></div>
                    </div>
                  </div>
                </div>

                {/* Seated figures */}
                <div className="flex justify-center space-x-8">
                  {/* Seated figure 1 */}
                  <div
                    className="animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <div className="w-16 h-16 relative">
                      <div className="w-8 h-8 bg-amber-400 rounded-full mx-auto mb-2"></div>
                      <div className="w-12 h-8 bg-green-400 rounded-t-xl mx-auto"></div>
                    </div>
                  </div>

                  {/* Seated figure 2 */}
                  <div
                    className="animate-pulse"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="w-16 h-16 relative">
                      <div className="w-8 h-8 bg-amber-500 rounded-full mx-auto mb-2"></div>
                      <div className="w-12 h-8 bg-orange-400 rounded-t-xl mx-auto"></div>
                    </div>
                  </div>
                </div>

                {/* Papers/Documents */}
                <div className="flex space-x-2 mt-4">
                  <div
                    className="w-8 h-6 bg-white rounded shadow-sm animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-8 h-6 bg-white rounded shadow-sm animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="w-8 h-6 bg-white rounded shadow-sm animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Welcome to
                <span className="block text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduConnect
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Choose your role to access the portal
              </p>
            </div>

            {/* Login Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                onClick={() => {
                  router.push("/admin/login");
                }}
              >
                <Users className="w-5 h-5" />
                <span>Admin Login</span>
              </button>

              <button
                className="group bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                onClick={() => {
                  router.push("/teacher/login");
                }}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Teacher Login</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              A dynamic directory of profiles for every professor!
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Connect with educators, explore academic profiles, and build
              meaningful educational relationships through our comprehensive
              platform.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Connect</h3>
                <p className="text-sm text-gray-600">Network with educators</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Explore</h3>
                <p className="text-sm text-gray-600">
                  Discover academic profiles
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Learn</h3>
                <p className="text-sm text-gray-600">Build relationships</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
