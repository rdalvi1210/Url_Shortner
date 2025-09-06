import { useSelector } from "react-redux";
import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

const DashboardPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br my-20 from-gray-50 to-gray-100 p-6">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            URL Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            {isAuthenticated && user
              ? `Welcome back, ${
                  user.name || "User"
                }! Manage your shortened links, track analytics, and create new ones.`
              : "Manage your shortened links, track analytics, and create new ones."}
          </p>
        </header>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Create New Short Link
              </h2>
              <UrlForm />
            </div>
          </div>

          {/* Right Column - Table */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Your Links
              </h2>
              <UserUrl />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
