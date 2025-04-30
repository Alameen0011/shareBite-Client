import { getSocket } from "@/api/socket"
import AdminError from "@/components/Admin/AdminError"
import DonationTrendChart from "@/components/Admin/DonationTrendChart"
import Loading from "@/components/Loading"
import { useAdmin } from "@/hooks/useAdmin"
import { useEffect } from "react"
import { toast } from "sonner"

const AdminDashboard = () => {



  const {getAdminDashboardOverview} = useAdmin() 

  const {data,isLoading,isError} = getAdminDashboardOverview

  const totalDonations = data?.totalDonations ?? 0;
const totalVolunteers = data?.totalVolunteers ?? 0;
const totalDonors = data?.totalDonors ?? 0;
const totalKiosks = data?.totalKiosks ?? 0;
const trend = data?.trend ?? [];
const topDonors = data?.topDonors ?? [];
const topVolunteers = data?.topVolunteers ?? [];
 


  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
  
    const handleVideoCallRequested = ({ from, roomID, role }:{from:string,roomID:string,role:string}) => {
      console.log("inside the vediocall Requested function in adminDashboard")
      console.log(from,"from")
      console.log(roomID,"from")
      console.log(from,"from")

      const callUrl = `${import.meta.env.VITE_CLIENT_URL}/video-room/${roomID}`;
  
      toast(`Incoming call from ${role}`, {
        description: 'click accept to join video call',
        action: {
          label: 'Accept',
          onClick: () => window.open(callUrl, '_blank'),
        },
        cancel: {
          label: 'Reject',
          onClick: () => socket.emit("call_declined", { from, roomID }),
        },
        duration: 10000,
        
      });
    };
  

    socket.on("call_Request", handleVideoCallRequested);
    console.log("Call_Request listeners count:", socket.listeners("call_Request"));
  
    return () => {
      socket.off("call_Request", handleVideoCallRequested);
    };
  }, []);
  


  if(isLoading) return <Loading />
  if(isError) return <AdminError />

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl font-bold my-6">Admin Dashboard</h1>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 font-tertiary">
      <StatCard label="Total Donations" value={totalDonations} />
      <StatCard label="Total Volunteers" value={totalVolunteers} />
      <StatCard label="Total Donors" value={totalDonors} />
      <StatCard label="Total Kiosks" value={totalKiosks} />
    </div>

    {/* Trend Chart */}
    <div className="p-6 bg-white rounded-xl shadow">
     
        <DonationTrendChart data={trend || []} />

    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 font-primary">
  <TopListCard title="Top 5 Donors" data={topDonors} field="donationsCount" />
  <TopListCard title="Top 5 Volunteers" data={topVolunteers} field="pickupsCount" />
</div>
  </div>
  )
}

export default AdminDashboard;


const StatCard = ({ label, value }: { label: string; value: number | undefined }) => (
  <div className="bg-white rounded-xl shadow p-5 text-center">
    <h3 className="text-sm text-gray-500">{label}</h3>
    <p className="text-2xl font-semibold text-gray-800">{value ?? '—'}</p>
  </div>
);

const TopListCard = ({
  title,
  data,
  field,
}: {
  title: string;
  data: { name: string; [key: string]: any }[] | undefined;
  field: string;
}) => (
  <div className="bg-white rounded-xl shadow p-5">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {data?.length ? (
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li key={index} className="flex justify-between text-gray-700">
            <span>{item.name}</span>
            <span className="font-medium">{item[field]}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No data available</p>
    )}
  </div>
)