import React from 'react'
import PlusIcon from '../../icnons/PlusIcon'

const Modal = ({ text, setDeleteModal, onDelete }) => {
    return (
        <div className='fixed z-50 inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
            <div className='bg-[#1a1b26] p-6 rounded-2xl border border-gray-800 shadow-xl max-w-sm w-full mx-4 relative'>
                <div onClick={() => setDeleteModal(false)} className='absolute -top-3 -right-3 bg-zinc-700 hover:bg-zinc-600 transition-colors rounded-full p-2 cursor-pointer shadow-lg'>
                    <PlusIcon className={'size-4 rotate-45 text-white'} />
                </div>
                <div>
                    <p className='text-lg text-gray-200 mb-6'>{text}</p>
                </div>
                <div className='flex justify-end gap-3'>
                    <button
                        onClick={() => setDeleteModal(false)}
                        className='px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className='px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal