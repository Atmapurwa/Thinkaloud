import CallApp from '@/components/core/call/app'
import { Separator } from '@/components/ui/separator'
// import { SidebarTrigger } from '@/components/ui/sidebar'
import { getAppConfig } from '@/lib/livekit/utils'
import { headers } from 'next/headers'
import React from 'react'

export default async function page() {
    const hdrs = await headers();
    const appConfig = await getAppConfig(hdrs);

    return (
        <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">
            {/* <header className="flex h-16 shrink-0 items-center gap-2 z-30">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1 text-bodyText" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h2 className='font-bold text-2xl'>Call</h2>
                </div>
            </header> */}


            <CallApp appConfig={appConfig} />
        </section>
    )
}
