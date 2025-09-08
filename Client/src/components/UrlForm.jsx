import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [slug, setSlug] = useState(""); // New state for custom slug
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  const handleSubmit = async () => {
    try {
      // Pass url and slug separately
      const shortUrlResult = await createShortUrl(
        url,
        isDashboard ? slug : null
      );
      setShortUrl(shortUrlResult);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      // Capture backend or network errors
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`${
        !isDashboard ? "min-h-screen" : ""
      } bg-gradient-to-br from-[#EADAF4] via-white to-[#EADAF4] flex items-center justify-center px-4 py-12`}
    >
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Free Shortener Section */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-10 border border-[#EADAF4] flex flex-col justify-start">
          <h2 className="text-2xl font-bold text-[#4B145B] mb-6 text-center md:text-left">
            Free URL Shortener
          </h2>

          <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-sm font-semibold text-[#4B145B] mb-2"
            >
              Enter your URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onInput={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full px-4 py-3 border border-[#EADAF4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EADAF4] focus:border-[#4B145B]"
            />
          </div>

          {/* Slug input - only show on dashboard */}
          {isDashboard && (
            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-sm font-semibold text-[#4B145B] mb-2"
              >
                Custom Slug (optional)
              </label>
              <input
                type="text"
                id="slug"
                value={slug}
                onInput={(e) => setSlug(e.target.value)}
                placeholder="my-custom-short-url"
                className="w-full px-4 py-3 border border-[#EADAF4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EADAF4] focus:border-[#4B145B]"
              />
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            type="submit"
            className={`w-full bg-[#4B145B] hover:bg-[#3A0D47] text-white font-semibold py-3 px-4 rounded-lg shadow-md transition ${
              !url ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!url}
          >
            Shorten URL
          </button>

          {shortUrl && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#4B145B] mb-2">
                Your shortened URL:
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center border border-[#EADAF4] rounded-lg overflow-hidden">
                <input
                  type="text"
                  readOnly
                  value={shortUrl}
                  className="flex-1 p-3 bg-gray-50 text-gray-800"
                />
                <button
                  onClick={handleCopy}
                  className={`mt-2 sm:mt-0 sm:ml-2 px-5 py-3 font-medium transition ${
                    copied
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-[#EADAF4] text-[#4B145B] hover:bg-[#d6bfe7]"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Promo Section - hide on /dashboard */}
        {!isDashboard && (
          <div className="flex-1 bg-gradient-to-r from-[#4B145B] to-[#7E3A9D] text-white shadow-xl rounded-2xl p-10 flex flex-col justify-center items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
              Get Your Custom URL
            </h2>
            <p className="text-lg mb-6 text-center md:text-left">
              Want branded short links with your own custom slug? Unlock premium
              features by creating a free account today.
            </p>
            <Link
              to="/auth"
              className="bg-white text-[#4B145B] font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-gray-100 transition text-lg"
            >
              Get Custom URL
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlForm;
