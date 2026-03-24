import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import RightPanel from '../components/RightPanel'

const Dashboard = () => {

    // useEffect(() => {
    //     async function authentication(){
    //         await axios.get()
    //     }
    // })

    return (
        <div className='w-screen h-dvh flex'>
            <Sidebar className={'w-fit sm:w-[20%] h-full'} />
            <RightPanel className={'w-full sm:w-[80%] h-full'} />
        </div>
    )
}

export default Dashboard