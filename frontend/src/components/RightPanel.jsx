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
import Card from './ui/Card'

const RightPanel = ({ className }) => {

    const [contents, setContents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        try {
            async function fetchContents() {

                const allContent = await axios.get("http://localhost:3000/api/content", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    const handleDeleteContent = (deletedId) => {
        setContents(prevContents => prevContents.filter(content => content._id !== deletedId));
    };

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

    return (
        <div className={`${className} relative bg-[#060608] text-white p-6 md:px-10 overflow-y-auto`}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 w-full gap-4">
                <h1 className="text-3xl font-bold text-gray-100">All Notes</h1>
                <div className="flex gap-4">
                    <Button frontIcon={<ShareIcon className='size-5' />} variant="secondary" text='Share' size="sm" handleClick={() => { }} />
                    <Button frontIcon={<PlusIcon className='size-6' />} variant="primary" text='Create Content' size="sm" handleClick={() => navigate('/create-task')} />
                </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {contents.map((note) => (
                    <Card key={note._id} id={note._id} title={note.title} link={note.link} type={note.type} tags={note.tags} iconType={getIconByType(note.type)} onDeleteSuccess={handleDeleteContent} />
                ))}
            </div>

        </div>
    )
}

export default RightPanel