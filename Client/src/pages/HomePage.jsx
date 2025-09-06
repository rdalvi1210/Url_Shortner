import { ArrowRight } from "lucide-react";
import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div className="min-h-screen mt-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight mb-4">
          Shorten Your Links, Share Smarter 🚀
        </h1>
        <p className="text-gray-600 max-w-2xl text-lg mb-8">
          A fast, secure and modern URL shortener to make your links simple,
          trackable and beautiful. Shorten your long links into easy-to-share
          smart links in seconds.
        </p>

        {/* Form Card */}
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <UrlForm />
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center gap-2 text-blue-600 hover:text-indigo-600 transition cursor-pointer">
          <span className="font-medium">See how it works</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-t py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🔗 Short & Clean Links
            </h3>
            <p className="text-gray-600 text-sm">
              Convert long, messy URLs into clean and shareable short links.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              📊 Track Analytics
            </h3>
            <p className="text-gray-600 text-sm">
              Get insights with click tracking, referrers, and device info.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🛡️ Secure & Reliable
            </h3>
            <p className="text-gray-600 text-sm">
              Protected with authentication, expiry controls, and SSL security.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} URL Shortener. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
