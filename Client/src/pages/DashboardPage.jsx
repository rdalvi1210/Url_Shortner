import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

const DashboardPage = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left Column - URL Form */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md flex flex-col">
    
          <UrlForm />
        </div>

        {/* Right Column - User URLs Table */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md flex flex-col">
          <UserUrl />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
