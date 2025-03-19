import { setAccessToken } from '@/features/auth/authSlice'
import { useAuth } from '@/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Verify = () => {
  
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()

    const token = searchParams.get("token")
    console.log(searchParams,"search params")
    console.log(token,"token")
    const { verifyRegisterMutation} = useAuth()
    const {  mutateAsync:VerifyRegisterMutate } = verifyRegisterMutation


    const handleRegisterVerification =async () => {
        const verifyData = {
            token:token
        }
        try {

            const res = await VerifyRegisterMutate(verifyData)
            console.log(res,"response after verification")
            if(res.success){
                alert(res.message)
                const {token,role} = res
                const data = {
                    token,
                    role
                }
                dispatch(setAccessToken(data))
                alert("setuped to redux succesfully")
               

            }
            
        } catch (error) {
            console.log(error)
            
        }
    }




  return (
    <button className='bg-black text-white'  onClick={handleRegisterVerification} >Verify</button >
  )
}

export default Verify