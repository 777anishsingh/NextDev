import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import { AppSidebar } from './_component/AppSidebar';
import AppHeader from './_component/AppHeader';

const WorkspaceLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <div className='bg-amber-200'>

            <SidebarProvider>
                <AppSidebar />

                <div className='w-full'>
                    <AppHeader />
                    {children}
                </div>

            </SidebarProvider>
        </div>
    )
}

export default WorkspaceLayout