import React, { useState } from 'react'
import ShareIcon from '../../icnons/ShareIcon'
import DeleteIcon from '../../icnons/DeleteIcon'
import Modal from './Modal'

// Extract the tweet ID from a twitter.com or x.com URL
const getTweetId = (url) => {
    const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/)
    return match ? match[1] : null
}

// Convert any YouTube URL to an embeddable /embed/ URL
const getYoutubeEmbedUrl = (url) => {
    // Already an embed URL
    if (url.includes('/embed/')) return url

    let videoId = null

    // youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
    if (shortMatch) videoId = shortMatch[1]

    // youtube.com/watch?v=VIDEO_ID  or  /shorts/VIDEO_ID
    if (!videoId) {
        const longMatch = url.match(/(?:v=|\/shorts\/)([a-zA-Z0-9_-]{11})/)
        if (longMatch) videoId = longMatch[1]
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
}

import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

const Card = ({ id, title, link, type, tags, iconType, onDeleteSuccess }) => {

    const navigate = useNavigate()
    const [deleteModal, setDeleteModal] = useState(false)

    const handleDelete = async () => {
        const token = localStorage.getItem("token")
        const response = await axios.delete(`http://localhost:3000/api/content/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        console.log(response)

        if (response.data) {
            toast.success('Note deleted Successfully')
            setDeleteModal(false)
            if (onDeleteSuccess) {
                onDeleteSuccess(id)
            }
        } else {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="bg-[#111218] border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 min-h-[200px] shadow-sm hover:border-gray-700 transition-colors">
            <div className='flex justify-between items-start text-gray-100 mb-2'>
                <div className='flex items-center gap-2'>
                    {iconType}
                    {title}
                </div>
                <div className='flex items-center gap-3 text-gray-400 mt-1'>
                    <button
                        onClick={() => navigate(`/update-task/${id}`)}
                        className="hover:text-indigo-400 transition-colors cursor-pointer   "
                        title="Edit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.89 1.128l-2.85.95a.5.5 0 0 1-.632-.632l.95-2.85a4.5 4.5 0 0 1 1.128-1.89l10.06-10.060Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 7.125-3.375-3.375" />
                        </svg>
                    </button>
                    <ShareIcon className='size-6 cursor-pointer' />
                    <DeleteIcon onClick={() => setDeleteModal(true)} className='size-6 cursor-pointer' />
                </div>
            </div>
            <div>
                {type === "video" && (() => {
                    const embedUrl = getYoutubeEmbedUrl(link)
                    if (!embedUrl) {
                        return (
                            <a href={link} target="_blank" rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline text-sm break-all">
                                {link}
                            </a>
                        )
                    }
                    return (
                        <div className="w-full aspect-video rounded-lg overflow-hidden">
                            <iframe
                                className="w-full h-full"
                                src={embedUrl}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )
                })()}

                {type === "tweet" && (() => {
                    const tweetId = getTweetId(link)
                    if (!tweetId) {
                        return (
                            <a href={link} target="_blank" rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline text-sm break-all">
                                {link}
                            </a>
                        )
                    }
                    return (
                        <iframe
                            src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark&dnt=true`}
                            title={title || "Tweet"}
                            frameBorder="0"
                            scrolling="no"
                            className="w-full rounded-xl border-0"
                            style={{ minHeight: "300px" }}
                            allowFullScreen
                        />
                    )
                })()}

                {type === "link" && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 underline underline-offset-2 text-sm break-all transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 005.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        {link}
                    </a>
                )}
            </div>

            {
                deleteModal ? (
                    <>
                        <Modal text={`Are you sure you want to delete ${title} note`} setDeleteModal={setDeleteModal} onDelete={handleDelete} />
                    </>
                ) : null
            }
        </div>
    )
}

export default Card