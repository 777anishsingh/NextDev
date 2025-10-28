"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useUser();
    useEffect(() => {
        user && createNewUser();
    }, [user])

    const [userDeatil, setUserDeatil] = useState<any>()



    const createNewUser = async () => {
        const result = await axios.post('/api/users', {})
        console.log(result.data);
        setUserDeatil(result.data?.user)
    }

    return (
        <div>
            <UserDetailContext.Provider value={{ userDeatil, setUserDeatil }}>

                {children}
            </UserDetailContext.Provider>
        </div>
    )
}


export default Provider