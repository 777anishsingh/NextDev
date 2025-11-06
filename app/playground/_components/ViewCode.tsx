import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Copy, CopyIcon, Ghost } from 'lucide-react';
import { toast } from 'sonner';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ViewCode = ({ children, code }: any) => {

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        toast.success('Code Copied!')
    }


    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className='min-w-7xl max-h-[600px] overflow-auto'>
                <DialogHeader>
                    <DialogTitle>
                        <div className='flex gap-4 items-center'>
                            Source Code
                            <Button variant={'outline'} className='border-2' onClick={handleCopy}>
                                <CopyIcon />
                            </Button>
                        </div>
                    </DialogTitle>
                    <DialogDescription className='max-w-304' asChild>

                        <SyntaxHighlighter language="javascript" style={oneDark}>
                            {code}
                        </SyntaxHighlighter>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    )
}

export default ViewCode

