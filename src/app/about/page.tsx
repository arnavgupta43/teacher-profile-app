"use client";
import { useEffect, useState } from "react";
import { Menu, X, BookOpen, Users, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { MarqueeDemo } from "@/components/reviews/review";
import { RippleDemo } from "@/components/AboutAnimation/RippleDemo";

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

      {/* Main container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Ripple Animation */}
        <section className="py-10 text-center">
          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl mb-8">
            <RippleDemo />
          </div>

          <p className="text-xl text-gray-900  max-w-3xl mx-auto leading-relaxed">
            Your comprehensive faculty management solution designed to
            streamline educational administration and enhance institutional
            efficiency.
          </p>
        </section>

        {/* Features Section */}
        <section className="py-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Faculty Management
              </h3>
              <p className="text-gray-600">
                A comprehensive web portal that allows faculties to view their
                details and personal information in a user-friendly interface.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Admin Control
              </h3>
              <p className="text-gray-600">
                Administrators can create, view, update, and delete faculty
                records as per institutional requirements with full CRUD
                operations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Continuous Development
              </h3>
              <p className="text-gray-600">
                Currently in active development with new features being rolled
                out constantly to enhance user experience and functionality.
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how EduConnect is transforming faculty management across
              educational institutions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <MarqueeDemo />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of educational institutions already using
              EduConnect to streamline their faculty management.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Get Started Today
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
