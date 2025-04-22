import { getSocket } from "@/api/socket"
import DonationTrendChart from "@/components/Admin/DonationTrendChart"
import { useAdmin } from "@/hooks/useAdmin"
import { useEffect } from "react"
import { toast } from "sonner"

const AdminDashboard = () => {

  const {getDonationTrend,getTotalDonations,getTotalDonors,getTotalKiosks,getTotalVolunteers} = useAdmin()
  const {data: trend, isLoading:loadingTrend} = getDonationTrend
  const {data:totalDonations} = getTotalDonations
  const {data:totalVolunteers} = getTotalVolunteers
  const {data:totalDonors} = getTotalDonors
  const {data:totalKiosks} = getTotalKiosks



  useEffect(() => {
    const socket = getSocket()
    console.log("socket in admin:", socket); 
    if(!socket) return
    console.log("called useEFFECT in ADminDashoard")



    const handleVideoCallRequested = ({from,roomID,userName }) => {

      console.log("Vedio call requested")

      const callUrl = `${import.meta.env.VITE_CLIENT_URL}/video-room/${roomID}`

      //accept or reject
      toast(`Incoming call from ${userName}`,{
        description: 'click accept to join video call',
        action:{
          label:'Accept',
          onClick: () => {
            window.open(callUrl,'_blank')
          },
        },
        cancel:{
          label:'reject',
          onClick: () => {
            socket.emit("call_declined",{ from,roomID })
          }
        },
        duration:100000
      })

    }

    socket.on("call_Request",handleVideoCallRequested)



    return () => {
      socket.off("call_Request",handleVideoCallRequested)
    }


  },[])




  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl font-bold my-6">Admin Dashboard</h1>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard label="Total Donations" value={totalDonations} />
      <StatCard label="Total Volunteers" value={totalVolunteers} />
      <StatCard label="Total Donors" value={totalDonors} />
      <StatCard label="Total Kiosks" value={totalKiosks} />
    </div>

    {/* Trend Chart */}
    <div className="p-6 bg-white rounded-xl shadow">
      {loadingTrend ? (
        <p>Loading trend chart...</p>
      ) : (
        <DonationTrendChart data={trend || []} />
      )}
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