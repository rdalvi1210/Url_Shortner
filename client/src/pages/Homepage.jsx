import UrlForm from "../components/UrlForm.jsx";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            URL Shortener
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your long URLs into short, shareable links in seconds
          </p>
        </div>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <UrlForm />
            {/* Result */}
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
