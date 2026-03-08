import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import LoginModal from '../components/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { Coins } from "lucide-react"
import { serverUrl } from '../App'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

import AuroraBackground from "../components/AuroraBackground"
import Reveal from "../components/Reveal"
import FeatureCard from "../components/FeatureCard"

function Home() {

    const highlights = [
        "AI Generated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ]

    const [openLogin, setOpenLogin] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [websites, setWebsites] = useState([])

    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (!userData) return

        const handleGetAllWebsites = async () => {
            try {

                const result = await axios.get(
                    `${serverUrl}/api/website/get-all`,
                    { withCredentials: true }
                )

                setWebsites(result.data || [])

            } catch (error) {
                console.log(error)
            }
        }

        handleGetAllWebsites()

    }, [userData])

    return (

        <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>

            <AuroraBackground />

            {/* Navbar */}

            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/30 border-b border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
            >

                <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>

                    <div
                        className='text-lg font-semibold cursor-pointer'
                        onClick={() => navigate("/")}
                    >
                        Vibe.ai
                    </div>

                    <div className='flex items-center gap-5'>

                        <div
                            className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer'
                            onClick={() => navigate("/pricing")}
                        >
                            Pricing
                        </div>

                        {userData && (

                            <div
                                className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition'
                                onClick={() => navigate("/pricing")}
                            >

                                <Coins size={14} className='text-yellow-400' />

                                <span className='text-zinc-300'>Credits</span>

                                <span>{userData?.credits}</span>

                                <span className='font-semibold'>+</span>

                            </div>

                        )}

                        {!userData ? (

                            <button
                                className='px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm'
                                onClick={() => setOpenLogin(true)}
                            >
                                Get Started
                            </button>

                        ) : (

                            <div className='relative'>

                                <button
                                    className='flex items-center'
                                    onClick={() => setOpenProfile(!openProfile)}
                                >

                                    <img
                                        src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData?.name}`}
                                        alt=""
                                        referrerPolicy='no-referrer'
                                        className='w-9 h-9 rounded-full border border-white/20 object-cover'
                                    />

                                </button>

                                <AnimatePresence>

                                    {openProfile && (

                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                                        >

                                            <div className='px-4 py-3 border-b border-white/10'>

                                                <p className='text-sm font-medium truncate'>
                                                    {userData?.name}
                                                </p>

                                                <p className='text-xs text-zinc-500 truncate'>
                                                    {userData?.email}
                                                </p>

                                            </div>

                                            <button
                                                className='w-full px-4 py-3 text-left text-sm hover:bg-white/5'
                                                onClick={() => navigate("/dashboard")}
                                            >
                                                Dashboard
                                            </button>

                                            <button
                                                className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5'
                                                onClick={handleLogOut}
                                            >
                                                Logout
                                            </button>

                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>

                        )}

                    </div>

                </div>

            </motion.div>

            {/* Hero */}

            <section className='pt-44 pb-32 px-6 text-center'>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight"
                >

                    Build Stunning Websites <br />

                    <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
                        with AI
                    </span>

                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mt-8 max-w-2xl mx-auto text-zinc-400 text-lg'
                >

                    Describe your idea and let AI generate a modern,
                    responsive, production-ready website.

                </motion.p>

                <button
                    className="mt-12 px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
                    onClick={() =>
                        userData
                            ? navigate("/dashboard")
                            : setOpenLogin(true)
                    }
                >

                    {userData ? "Go to dashboard" : "Get Started"}

                </button>

            </section>


            {/* Features (ALWAYS VISIBLE) */}

            <section className='max-w-7xl mx-auto px-6 pb-32'>

                <Reveal>

                    <h2 className='text-3xl md:text-4xl font-bold text-center mb-14'>
                        Powerful AI Features
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>

                        {highlights.map((h, i) => (

                            <FeatureCard
                                key={i}
                                title={h}
                                description="Vibe.ai builds real websites with clean scalable production ready code."
                            />

                        ))}

                    </div>

                </Reveal>

            </section>


            {/* User Websites */}

            {userData && websites.length > 0 && (

                <section className='max-w-7xl mx-auto px-6 pb-32'>

                    <Reveal>

                        <h3 className='text-2xl font-semibold mb-8'>
                            Your Websites
                        </h3>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

                            {websites.slice(0, 3).map((w) => (

                                <motion.div
                                    key={w._id}
                                    whileHover={{ y: -6 }}
                                    onClick={() => navigate(`/editor/${w._id}`)}
                                    className="cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-xl"
                                >

                                    <div className='h-40 bg-black'>

                                        <iframe
                                            srcDoc={w.latestCode}
                                            className='w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white'
                                        />

                                    </div>

                                    <div className='p-4'>

                                        <h3 className='text-base font-semibold line-clamp-2'>
                                            {w.title}
                                        </h3>

                                        <p className='text-xs text-zinc-400'>
                                            Last Updated {new Date(w.updatedAt).toLocaleDateString()}
                                        </p>

                                    </div>

                                </motion.div>

                            ))}

                        </div>

                    </Reveal>

                </section>

            )}

          {/* Footer */}

<footer className="border-t border-white/10 py-14 px-6">

  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">

    {/* Brand */}

    <div className="text-center sm:text-left">
      <h3 className="text-lg font-semibold mb-4">Vibe.ai</h3>
      <p className="text-zinc-400 leading-relaxed">
        AI powered website builder that helps you create
        stunning websites in seconds.
      </p>
    </div>

    {/* Product */}

    <div className="text-center sm:text-left">
      <h4 className="font-semibold mb-4">Product</h4>

      <ul className="space-y-2 text-zinc-400">
        <li className="hover:text-white cursor-pointer transition">
          Features
        </li>

        <li
          className="hover:text-white cursor-pointer transition"
          onClick={() => navigate("/pricing")}
        >
          Pricing
        </li>

        <li className="hover:text-white cursor-pointer transition">
          Templates
        </li>
      </ul>
    </div>

    {/* Company */}

    <div className="text-center sm:text-left">
      <h4 className="font-semibold mb-4">Company</h4>

      <ul className="space-y-2 text-zinc-400">
        <li className="hover:text-white cursor-pointer transition">
          About
        </li>

        <li className="hover:text-white cursor-pointer transition">
          Careers
        </li>

        <li className="hover:text-white cursor-pointer transition">
          Contact
        </li>
      </ul>
    </div>

    {/* Legal */}

    <div className="text-center sm:text-left">
      <h4 className="font-semibold mb-4">Legal</h4>

      <ul className="space-y-2 text-zinc-400">
        <li className="hover:text-white cursor-pointer transition">
          Privacy Policy
        </li>

        <li className="hover:text-white cursor-pointer transition">
          Terms of Service
        </li>
      </ul>
    </div>

  </div>

  {/* Bottom Bar */}

  <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm gap-4">

    <p className="text-center md:text-left">
      © {new Date().getFullYear()} Vibe.ai — All rights reserved
    </p>

    <div className="flex gap-6">
      <span className="hover:text-white cursor-pointer">Twitter</span>
      <span className="hover:text-white cursor-pointer">GitHub</span>
      <span className="hover:text-white cursor-pointer">LinkedIn</span>
    </div>

  </div>

</footer>

            {openLogin && (
                <LoginModal
                    open={openLogin}
                    onClose={() => setOpenLogin(false)}
                />
            )}

        </div>

    )
}

export default Home