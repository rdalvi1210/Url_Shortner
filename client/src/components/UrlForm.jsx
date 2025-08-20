import { useState } from "react";
import { createUrl } from "../api/shorturl.api";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await createUrl(url);
    setShortUrl(res);
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    }
  };

  return (
    <>
      <form onSubmit={() => handleSubmit(event)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your URL
          </label>
          <input
            type="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            placeholder="https://example.com/very-long-url-that-needs-shortening"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-3"></h3>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-lg text-green-800 font-mono"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                copied
                  ? "bg-green-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UrlForm;
