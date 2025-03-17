import { Link } from "react-router-dom";

const DonorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Donor Dashboard</h1>
      <p className="text-gray-600">Manage your food donations here.</p>

      <div className="mt-4 space-x-4">
        <Link to="/donor/donations" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
          My Donations
        </Link>
        <Link to="/donor/add-donation" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Add Donation
        </Link>
      </div>
    </div>
  );
};

export default DonorDashboard;
