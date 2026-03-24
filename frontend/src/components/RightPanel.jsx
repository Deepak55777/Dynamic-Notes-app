import React, { useEffect, useState } from 'react'
import { FiShare2, FiPlus, FiTrash2, FiYoutube, FiLink } from 'react-icons/fi'
import { AiOutlineTwitter } from 'react-icons/ai'
import { HiOutlineDocumentText } from 'react-icons/hi'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import Button from './ui/Button'
import PlusIcon from '../icnons/PlusIcon'
import ShareIcon from '../icnons/ShareIcon'

const RightPanel = ({ className }) => {

    const [contents, setContents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        try {
            async function fetchContents() {
                const token = localStorage.getItem("token")

                if (!token) {
                    navigate('/signin')
                }

                const allContent = await axios.get("http://localhost:3000/api/content", {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                })

                const data = allContent.data
                setContents(data.content || [])
            }

            fetchContents()
        } catch (error) {
            toast.error(`Content is not fetch ${error}`)
        }

    }, [])

    console.log(contents)

    const getIconByType = (type) => {
        switch (type?.toLowerCase()) {
            case 'video':
                return <FiYoutube size={18} />;
            case 'tweet':
                return <AiOutlineTwitter size={18} />;
            case 'document':
                return <HiOutlineDocumentText size={18} />;
            case 'link':
                return <FiLink size={18} />
            default:
                return <HiOutlineDocumentText size={18} />;
        }
    }

    const notes = [
        {
            typeIcon: <HiOutlineDocumentText size={18} />,
            title: 'Project Ideas',
            innerTitle: 'Future Projects',
            content: (
                <ul className="list-disc list-inside text-gray-300 text-[15px] space-y-1.5 leading-relaxed mt-2 ml-1">
                    <li>Build a personal knowledge base</li>
                    <li>Create a habit tracker</li>
                    <li>Design a minimalist todo app</li>
                </ul>
            ),
            tags: ['#productivity', '#ideas'],
            date: '10/03/2024'
        },
        {
            typeIcon: <FiYoutube size={18} />,
            title: 'How to Build a Second Brain',
            content: (
                <div className="w-full h-40 bg-gray-800/80 rounded-xl flex items-center justify-center border border-gray-700/50">
                    <HiOutlineDocumentText className="text-gray-600 text-5xl" />
                </div>
            ),
            tags: ['#productivity', '#learning'],
            date: '09/03/2024'
        },
        {
            typeIcon: <AiOutlineTwitter size={18} />,
            title: 'Productivity Tip',
            content: (
                <p className="text-gray-300 text-[15px] leading-relaxed">
                    The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.
                </p>
            ),
            tags: ['#productivity', '#learning'],
            date: '08/03/2024'
        }
    ]

    return (
        <div className={`${className} bg-[#060608] text-white p-6 md:px-10 overflow-y-auto`}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 w-full gap-4">
                <h1 className="text-3xl font-bold text-gray-100">All Notes</h1>
                <div className="flex gap-4">
                    <Button frontIcon={<ShareIcon className='size-5' />} variant="secondary" text='Share' size="sm" handleClick={() => { }} />
                    <Button frontIcon={<PlusIcon className='size-6' />} variant="primary" text='Create Content' size="sm" handleClick={() => { }} />
                </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {contents.map((note, idx) => (
                    <div key={idx} className="bg-[#111218] border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 min-h-[250px] shadow-sm hover:border-gray-700 transition-colors">

                        {/* Card Header */}
                        <div className="flex justify-between items-start text-gray-100 mb-2">
                            <div className="flex items-center gap-2.5 font-medium text-[16px]">
                                <span className="text-gray-400 mt-0.5">{getIconByType(note.type)}</span>
                                <span className="wrap-break-word line-clamp-2 leading-tight">{note.title}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 mt-1">
                                <button className="hover:text-gray-200 transition-colors"><FiShare2 size={16} /></button>
                                <button className="hover:text-red-400 transition-colors"><FiTrash2 size={16} /></button>
                            </div>
                        </div>

                        {/* Content Area */}
                        {/* <div className="grow flex flex-col gap-2">
                            {note.innerTitle && (
                                <h2 className="text-2xl font-bold text-gray-100 mt-1 mb-2 tracking-wide leading-tight">{note.innerTitle}</h2>
                            )}
                            {note.content}
                        </div> */}

                        {/* Tags */}
                        {/* <div className="flex flex-wrap gap-2 mt-4">
                            {note.tags.map((tag, tagIdx) => (
                                <span key={tagIdx} className="bg-indigo-900/40 text-indigo-300 px-3 py-1 rounded-full text-[13px] font-medium border border-indigo-700/30">
                                    {tag}
                                </span>
                            ))}
                        </div> */}

                        {/* Date info */}
                        {/* <div className="text-[13px] text-gray-500 mt-2 font-medium">
                            Added on {note.date}
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RightPanel