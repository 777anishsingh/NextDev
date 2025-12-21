"use client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { UserDetailContext } from "@/context/UserDetailContext"
import { useAuth, UserButton } from "@clerk/nextjs"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"


export function AppSidebar() {

    const { has } = useAuth()
    const [projectList, setProjectList] = useState([])
    const context = useContext(UserDetailContext);

    if (!context) {
        throw new Error("Hero must be used within UserDetailContext.Provider");
    }

    const { userDetail, setUserDetail } = context; const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetProjectList()
    }, [])

    const hasUnlimitedAccess = has && has({ plan: 'unlimited' })


    const GetProjectList = async () => {
        setLoading(true)
        const result = await axios.get('/api/get-all-projects')
        // console.log(result.data);
        setProjectList(result.data)
        setLoading(false)

    }


    return (
        <Sidebar>
            <SidebarHeader >
                <div className="flex items-center gap-2">
                    <Image src={'/logo.svg'} alt='logo' height={30} width={30} />
                    <h2 className="font-bold text-xl">NextDev</h2>
                </div>
                <Link href={'/workspace'} className="mt-3 w-full"  >
                    <Button className="w-full">
                        Add New Project
                    </Button>
                </Link>
            </SidebarHeader>


            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    {projectList.length == 0 &&
                        <h2 className="text-sm px-2 text-gray-500">No Project Found</h2>}
                    <div>
                        {(!loading && projectList.length > 0) ? projectList.map((project: any, index) => (
                            <Link href={`/playground/${project.projectId}?frameId=${project.frameId}`}>
                                <div key={index} className="border mb-2 bg-gray-200 cursor-pointer rounded-lg hover:bg-gray-300">
                                    <h2 className="line-clamp-1 p-1">{project?.chats[0].chatMessage[0]?.content}</h2>
                                </div>
                            </Link>
                        )) :
                            [1, 2, 3, 4, 5].map((_, index) => (
                                <Skeleton className="w-full h-5 bg-slate-300 rounded-lg mb-5" />
                            ))
                        }
                    </div>
                </SidebarGroup >

                <SidebarGroup>
                </SidebarGroup>
            </SidebarContent>


            <SidebarFooter className="p-2">
                {!hasUnlimitedAccess && < div className="p-3 border rounded-xl space-y-3 bg-secondary">
                    <h2 className="flex justify-between items-center">Remaining Credits <span className="font-bold">{userDetail?.credits}</span></h2>
                    <Progress value={(userDetail?.credits / 3) * 100} />
                    <Link href={'/workspace/pricing'} className="w-full">
                        <Button className="w-full">
                            Upgrade to Unlimited
                        </Button>
                    </Link>
                </div>}
                <div className="flex items-center gap-2">
                    <UserButton />
                    <Button variant={'ghost'}>Settings</Button>
                </div>
            </SidebarFooter>
        </Sidebar >
    )
}