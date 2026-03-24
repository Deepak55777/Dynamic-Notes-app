import React from 'react'

const Button = (props) => {

    const variantStyle = {
        "primary": "bg-indigo-600 hover:bg-indigo-500 text-white",
        "secondary": "bg-[#1b1c2b] hover:bg-[#25273c] text-indigo-300"
    }

    const sizeVariant = {
        "sm": 'py-2 px-5',
        "md": 'py-4 px-8',
        "lg": 'py-6 px-10'
    }

    const defaultStyle = 'rounded-xl flex items-center transition-all duration-300'

    return (
        <>
            <button onClick={props.handleClick} className={`${variantStyle[props.variant]} ${sizeVariant[props.size]} ${defaultStyle}`}>
                <span className='pr-2'>{props.frontIcon}</span>  {props.text}
            </button>
        </>
    )
}

export default Button