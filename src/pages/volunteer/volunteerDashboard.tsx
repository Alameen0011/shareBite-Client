import { Link } from "react-router-dom";

const VolunteerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
    <div className="flex  flex-col items-center "> 
    <h1 className="text-2xl font-bold">Volunteer Dashboard</h1>
    <p className="text-gray-600">Manage your food donations here.</p>

    <div className="mt-4 space-x-4">
      <Link to="/volunteer/available-donations" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
        Available Donation
      </Link>
      <Link to="/volunteer/claimed-donations" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        claimed Donation
      </Link>
    </div>

    </div>

  </div>
  );
};

export default VolunteerDashboard;
