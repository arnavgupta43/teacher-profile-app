"use client";
import React, { useState } from "react";
import { Menu, X, BookOpen, Mail, MapPin, Phone, Target } from "lucide-react";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { subscribe } from "diagnostics_channel";
import toast, { ToastBar } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [isDisable, setDisable] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((val) => !val.trim())) {
      toast.error("Please fill in all fields.");
      setDisable(false);
      return;
    }
    setDisable(true);
    console.log("hit");
    try {
      const formPayload = new FormData();
      formPayload.append("firstName", formData.firstName);
      formPayload.append("lastName", formData.lastName);
      formPayload.append("email", formData.email);
      formPayload.append("subject", formData.subject);
      formPayload.append("message", formData.message);

      const response = await fetch(process.env.FORM_URL!, {
        method: "POST",
        body: formPayload,
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        toast.success("Messgae Sent");
        setTimeout(() => {
          //delay
        }, 2300);
        window.location.reload();
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Message not sent");
      }
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setDisable(false);
    }
  };
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      {/* Navigation */}
      <Toaster position="top-right" />
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => {
                  router.push("/");
                }}
              >
                EduConnect
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                onClick={() => router.push("/about")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
              >
                About
              </a>
              <a
                onClick={() => router.push("/contact")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
              >
                Contact
              </a>
              <button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
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
          <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                onClick={() => router.push("/about")}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                onClick={() => router.push("/contact")}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
              <button className="w-full text-left px-3 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or want to collaborate? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="md:flex">
            {/* Creator Profile Section */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Arnav Kumar Gupta</h2>
                <p className="text-blue-100 mb-6">Creator & Developer</p>

                {/* Contact Info */}
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>arnavkumargupta777@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 9144XXXX</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Bengaluru, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        onChange={handleChange}
                        name="firstName"
                        type="text"
                        required
                        className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        onChange={handleChange}
                        name="lastName"
                        required
                        type="text"
                        className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      required
                      className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      onChange={handleChange}
                      name="subject"
                      type="text"
                      required
                      className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      onChange={handleChange}
                      rows={4}
                      name="message"
                      required
                      className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-blue-400 to-red-300 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    type="submit"
                    disabled={isDisable}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Connect with Us
          </h3>
          <p className="text-gray-600 mb-8">
            Follow us on social media for updates and news
          </p>

          <div className="flex justify-center space-x-6">
            {/* Twitter */}
            <div className="group relative">
              <a
                href="https://twitter.com/optimisticweb"
                className="relative flex justify-center items-center w-16 h-16 text-2xl text-gray-700 border-2 border-gray-300 rounded-full overflow-hidden transition-all duration-300 hover:text-white hover:border-blue-500 hover:shadow-lg"
                aria-label="Twitter"
              >
                <FaTwitter className="relative z-10" />
                <span className="absolute inset-0 bg-blue-500 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              </a>
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-sm text-white px-3 py-1 rounded bg-gray-900 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                Twitter
              </span>
            </div>

            {/* Instagram */}
            <div className="group relative">
              <a
                href="https://www.instagram.com/optimisticweb"
                className="relative flex justify-center items-center w-16 h-16 text-2xl text-gray-700 border-2 border-gray-300 rounded-full overflow-hidden transition-all duration-300 hover:text-white hover:border-pink-500 hover:shadow-lg"
                aria-label="Instagram"
              >
                <FaInstagram className="relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              </a>
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-sm text-white px-3 py-1 rounded bg-gray-900 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                Instagram
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
