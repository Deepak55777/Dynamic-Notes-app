import React from 'react'

const SidebarItem = ({ variant, text, handleClick }) => {

    const variantStyle = {
        "primary": `${active ? 'bg-gray-600 hover:bg-gray-500' : 'bg-transparent hover:bg-gray-500'}`,
        "secondary": `${active ? 'bg-gray-600 hover:bg-gray-500' : 'bg-transparent hover:bg-gray-500'}`,
    }

    return (
        <>
            <button onClick={handleClick} className={`${variantStyle[variant]} `}>
                {text}
            </button>
        </>
    )
}

export default SidebarItem