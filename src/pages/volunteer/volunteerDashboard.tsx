import { Link } from "react-router-dom";

const VolunteerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Volunteer Dashboard</h1>
      <p className="text-gray-600">Claim and deliver food donations.</p>

      <div className="mt-4 space-x-4">
        <Link to="/volunteer/available-donations" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
          Available Donations
        </Link>
        <Link to="/volunteer/claimed-donations" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          My Claims
        </Link>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
