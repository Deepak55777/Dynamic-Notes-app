import React, { useState } from 'react'
import { AiOutlineTwitter } from 'react-icons/ai'
import { FiYoutube, FiFileText, FiLink, FiHash } from 'react-icons/fi'
import { useNavigate } from 'react-router'

const Sidebar = ({ className }) => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('')

    const sidebarMenu = [
        { menuName: 'Tweets', icon: <AiOutlineTwitter size={22} /> },
        { menuName: 'Videos', icon: <FiYoutube size={22} /> },
        { menuName: 'Documents', icon: <FiFileText size={22} /> },
        { menuName: 'Links', icon: <FiLink size={22} /> },
        { menuName: 'Tags', icon: <FiHash size={22} /> }
    ]

    return (
        <div className={`${className} bg-[#0c0d12] border-r border-gray-800 text-gray-300 flex flex-col`}>
            <div className='w-full px-4 md:px-6 py-6'>
                <div onClick={() => navigate('/')} className='text-center mb-8 cursor-pointer flex items-center max-md:justify-center gap-3'>
                    <span className='max-md:block hidden text-4xl tracking-wider font-bold uppercase text-white'>Z</span>
                    <span className='max-md:hidden text-3xl tracking-wider font-bold uppercase text-white'>Zeno</span>
                </div>

                <div className='flex flex-col gap-2'>
                    {sidebarMenu.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveMenu(item.menuName)}
                            className={`flex items-center max-md:justify-center max-md:w-fit max-md:mx-auto gap-4 p-3 rounded-xl cursor-pointer hover:bg-gray-800 hover:text-white transition-all duration-200 ${activeMenu === item.menuName ? 'bg-gray-800 text-white' : ''}`}
                        >
                            <span className="text-gray-400 font-bold ">{item.icon}</span>
                            <span className="text-[17px] font-medium tracking-wide hidden md:block">{item.menuName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar