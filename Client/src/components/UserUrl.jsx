import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../api/user.api";
import { Loader2, Check, Copy } from "lucide-react";

const UserUrl = () => {
  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // auto refresh
    staleTime: 0,
  });

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg my-4 text-sm">
        ⚠️ Error loading your URLs: {error.message}
      </div>
    );
  }

  if (!urls?.urls || urls.urls.length === 0) {
    return (
      <div className="text-center my-10 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        <p className="text-lg font-semibold text-gray-700">No URLs found</p>
        <p className="text-gray-500 mt-1">
          You haven’t shortened any links yet. Create one above!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl mt-8 shadow-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto max-h-72">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Original URL
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Short URL
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {urls.urls
              .slice()
              .reverse()
              .map((url) => (
                <tr key={url._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 max-w-xs truncate text-gray-700">
                    {url.full_url}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`http://localhost:3000/${url.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-indigo-600 font-medium"
                    >
                      localhost:3000/{url.short_url}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleCopy(
                          `http://localhost:3000/${url.short_url}`,
                          url._id
                        )
                      }
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        copiedId === url._id
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {copiedId === url._id ? (
                        <>
                          <Check className="w-4 h-4" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUrl;
