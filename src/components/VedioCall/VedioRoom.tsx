import { useEffect, useId } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { getSocket } from '@/api/socket';
import { getUserIdFromToken } from '@/utils/jwtDecode';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { toast } from 'sonner';

const VedioRoom = () => {
    //room id - something unique
    const { roomID } = useParams()
    //support-72394294240

    console.log(roomID,"room idd")

    const { accessToken } = useSelector((state: RootState) => state.auth);

    const clientId = getUserIdFromToken(accessToken)

    //random userId - unique
    const userID = "guest-" + clientId;

    //app id
    const appID = import.meta.env.VITE_APPID_ZEGOCLOUD;
    const userName ="GUEST"

    useEffect(() => {

        const init = async () => {

          try {
          //In production go and get a token from server , copy paste zegoServerAssistant from official git folder pass appID,userID,secret-serverSecret,effectivetimeSecond,payload-roomId,
          //givee the token in client kitToken creation for production

        const response = await axiosInstance.get(`/user/rtc-token?roomID=${roomID}&userID=${userID}`)
        const backendToken = response.data.token 

        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForProduction(Number(appID),backendToken,roomID!,userID,userName);

        console.log(kitToken,"KITTT TOKEENNNNN");


            //create instance object from token from server
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container:document.getElementById("vedio-call-container"),
                sharedLinks: [
                    {
                      name: 'Join from another device',
                      url: `${window.location.origin}/video-room/${roomID}`,
                    },
                  ],
                scenario: {
                  mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                
                
            })
            
          } catch (error) {
            console.log(error,"error in vedio zego")
            
          }
         



        }

        init()
    },[roomID,userID,appID])


    useEffect(() => {
      const socket = getSocket()
      console.log("socket in DONOR/Volunteer:", socket); 
      console.log("called socket useEffect called")
      if (!socket) return;


      const handleDecline = ({ message}) => {
        console.log(roomID,"declined id from other client")
        toast.error(`Admin declined, ${message}.`);
        // optionally: navigate away, close call UI, or show retry
      };
    
      socket.on("call_declined", handleDecline);



      socket?.emit("call_Request",{
        from: clientId,
        roomID,
        userName
      })

      return () => {
        socket.off("call_declined",handleDecline)
      }

    },[roomID,clientId,userID])






    return <div id="video-call-container" style={{ width: '100%', height: '100vh' }} />;
}

export default VedioRoom