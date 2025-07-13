"use client";
import { useEffect, useState } from "react";
import { Menu, X, BookOpen, Users, GraduationCap } from "lucide-react";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 min-h-screen">
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
                onClick={() => {
                  router.push("/contact");
                }}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
              >
                Contact
              </a>
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
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
      {/* Main contianer */}
      <main className="max-w-7xl mx-auto px-4 mt-11 sm:px-6 lg:px-8 py-12">
        <div className="border-2 border-amber-800 px-3 py-3">
          <p className="text-2xl md:text-2xl font-bold text-gray-900 leading-tight text-center">
            A web portal for the faulties to view their details and admins to
            manage faulty.
          </p>
          <p className="text-2xl md:text-2xl font-bold text-gray-900 leading-tight text-center">
            Admin can create , view , upadate nad delete faculties are per
            requirement
          </p>
          <p className="text-2xl md:text-2xl font-bold text-gray-900 leading-tight text-center">
            Still in the developement phase as more features are been rolled out
            constanlly
          </p>
        </div>
      </main>
    </div>
  );
}
