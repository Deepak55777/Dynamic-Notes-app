import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

const UpdateTask = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        title: '',
        link: '',
        type: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    // Fetch existing content
    useEffect(() => {
        const fetchContentDetails = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/content", {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const contents = response.data.content || []
                const currentContent = contents.find(item => item._id === id)

                if (currentContent) {
                    setFormData({
                        title: currentContent.title || '',
                        link: currentContent.link || '',
                        type: currentContent.type || ''
                    })
                } else {
                    toast.error("Content not found")
                    navigate('/dashboard')
                }
            } catch (error) {
                console.error("Error fetching content details:", error)
                toast.error("Failed to load content details")
                navigate('/dashboard')
            } finally {
                setIsFetching(false)
            }
        }

        if (id) {
            fetchContentDetails()
        }
    }, [id, navigate])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.title || !formData.link || !formData.type) {
            return toast.error("Please fill all required fields")
        }

        setIsLoading(true)

        try {
            const response = await axios.put(`http://localhost:3000/api/content/${id}`, {
                ...formData,
                tags: []
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = response.data
            
            if (data) {
                toast.success("Content updated successfully!")
                navigate('/dashboard')
            }
        } catch (error) {
            console.error("Error updating content:", error)
            toast.error(error.response?.data?.message || "Failed to update content")
        } finally {
            setIsLoading(false)
        }
    }

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Content</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="title" className="text-sm text-gray-400">Title</label>
                    <input 
                        type="text" 
                        placeholder="Enter title" 
                        id="title" 
                        value={formData.title}
                        onChange={handleChange} 
                        className="bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="link" className="text-sm text-gray-400">Link</label>
                    <input 
                        type="url" 
                        placeholder="https://example.com" 
                        id="link" 
                        value={formData.link}
                        onChange={handleChange} 
                        className="bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="type" className="text-sm text-gray-400">Type</label>
                    <select 
                        id="type" 
                        value={formData.type}
                        onChange={handleChange} 
                        className="bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="" disabled>Select content type</option>
                        <option value="video">Video</option>
                        <option value="document">Document</option>
                        <option value="tweet">Tweet</option>
                        <option value="link">Link</option>
                    </select>
                </div>

                <div className="flex gap-4 mt-6">
                    <button 
                        type="button" 
                        onClick={() => navigate('/dashboard')}
                        className="flex-1 py-2 rounded-md font-medium transition-colors bg-gray-700 hover:bg-gray-600 border border-gray-600"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`flex-1 py-2 rounded-md font-medium transition-colors ${
                            isLoading 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {isLoading ? 'Updating...' : 'Update Content'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateTask
