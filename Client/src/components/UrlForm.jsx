import { Check, Copy, Link2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createShortUrl } from "../api/shortUrl.api";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const validateUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    try {
      const result = await createShortUrl(url, customSlug);
      setShortUrl(result);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* URL input */}
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Enter your URL
        </label>
        <div className="relative">
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            aria-label="URL to shorten"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 shadow-sm"
          />
          <Link2 className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Custom slug for logged-in users */}
      {isAuthenticated && (
        <div>
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500 shadow-sm"
          />
          {customSlug && (
            <p className="text-xs text-gray-500 mt-1">
              Final URL:{" "}
              <span className="font-medium">yourdomain.com/{customSlug}</span>
            </p>
          )}
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !url}
        type="submit"
        className="w-full flex items-center justify-center
          bg-gradient-to-r from-blue-500 to-indigo-600 text-white
          py-2.5 px-4 rounded-lg font-medium shadow-md
          hover:from-blue-600 hover:to-indigo-700
          focus:outline-none focus:ring-2 focus:ring-indigo-400
          disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Shortening...
          </>
        ) : (
          "Shorten URL"
        )}
      </button>

      {/* Error message */}
      {error && (
        <div
          className="mt-2 p-3 bg-red-100 border border-red-300
          text-red-700 rounded-lg text-sm"
        >
          {error}
        </div>
      )}

      {/* Shortened URL result */}
      {shortUrl && (
        <div
          className="mt-6 bg-gray-50 border border-gray-200
          p-4 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Your shortened URL:
          </h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300
                rounded-l-lg bg-white text-gray-700"
            />
            <button
              onClick={handleCopy}
              aria-label="Copy shortened URL"
              className={`px-4 py-2 flex items-center gap-1 rounded-r-lg transition ${
                copied
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
