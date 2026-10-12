import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Auth({isModel = false}) {
    const dispatch = useDispatch()

    const [authLoading, setAuthLoading] = React.useState(false)

    const handleGoogleAuth = async () => {
        try {
            setAuthLoading(true)
            const response = await signInWithPopup(auth,provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
            if (result.data?.token) {
                localStorage.setItem("interviewiq_token", result.data.token)
            }
            localStorage.setItem("interviewiq_user", JSON.stringify(result.data))
            dispatch(setUserData(result.data))
        } catch (error) {
            console.error(error)
            alert("Google Sign-In Notice: " + (error.message || "Failed to sign in. Please try 1-Click Demo Login."))
              dispatch(setUserData(null))
        } finally {
            setAuthLoading(false)
        }
    }

    const handleDemoAuth = async () => {
        try {
            setAuthLoading(true)
            const name = "Demo Candidate"
            const email = "candidate@interviewiq.com"
            const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
            if (result.data?.token) {
                localStorage.setItem("interviewiq_token", result.data.token)
            }
            localStorage.setItem("interviewiq_user", JSON.stringify(result.data))
            dispatch(setUserData(result.data))
        } catch (error) {
            console.error(error)
            alert("Demo Login failed: " + (error.response?.data?.message || error.message))
        } finally {
            setAuthLoading(false)
        }
    }
  return (
    <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
    `}>
        <motion.div 
        initial={{opacity:0 , y:-40}} 
        animate={{opacity:1 , y:0}} 
        transition={{duration:1.05}}
        className={`
        w-full 
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
        bg-white shadow-2xl border border-gray-200
      `}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-black text-white p-2 rounded-lg'>
                    <BsRobot size={18}/>

                </div>
                <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                Continue with
                <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                    <IoSparkles size={16}/>
                    AI Smart Interview

                </span>
            </h1>

            <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to start AI-powered mock interviews,
        track your progress, and unlock detailed performance insights.
            </p>


            <div className='flex flex-col gap-3'>
                <motion.button 
                onClick={handleGoogleAuth}
                disabled={authLoading}
                whileHover={{opacity:0.9 , scale:1.02}}
                whileTap={{opacity:1 , scale:0.98}}
                className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md disabled:opacity-50 cursor-pointer'>
                    <FcGoogle size={20}/>
                    {authLoading ? "Signing in..." : "Continue with Google"}
                </motion.button>

                <div className='flex items-center my-1'>
                    <div className='flex-grow border-t border-gray-200'></div>
                    <span className='px-3 text-xs text-gray-400 font-medium uppercase'>or</span>
                    <div className='flex-grow border-t border-gray-200'></div>
                </div>

                <motion.button 
                onClick={handleDemoAuth}
                disabled={authLoading}
                whileHover={{opacity:0.95 , scale:1.02}}
                whileTap={{opacity:1 , scale:0.98}}
                className='w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full shadow-md transition disabled:opacity-50 cursor-pointer'>
                    <IoSparkles size={18}/>
                    {authLoading ? "Signing in..." : "Instant Demo Login (1-Click)"}
                </motion.button>
            </div>
        </motion.div>

      
    </div>
  )
}

export default Auth
