import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const CreateTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        link: '',
        type: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

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
            const response = await axios.post("http://localhost:3000/api/content", {
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
                toast.success("Content created successfully!")
                navigate('/dashboard')
            }
        } catch (error) {
            console.error("Error creating content:", error)
            toast.error(error.response?.data?.message || "Failed to create content")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Content</h2>
            
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

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full mt-6 py-2 rounded-md font-medium transition-colors ${
                        isLoading 
                            ? 'bg-indigo-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                    {isLoading ? 'Creating...' : 'Create Content'}
                </button>
            </form>
        </div>
    )
}

export default CreateTask