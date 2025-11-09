import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4 relative">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 text-bodyText selector1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h3 className='font-bold'>Assignments</h3>
                </div>
            </header>

            <div className='overflow-y-auto mb-6'>
                <section className="w-full flex flex-col justify-start gap-6">
                    <div className="flex items-center justify-between px-4 lg:px-6">
                        <Skeleton className="h-8 w-48" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-9 w-40" />
                            <Skeleton className="h-9 w-32" />
                        </div>
                    </div>

                    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                        <div className="overflow-hidden rounded-lg border">
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default Loading
