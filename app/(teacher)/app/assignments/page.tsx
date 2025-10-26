import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

import data from "./data.json"
import { DataTable } from './data-table'

const Assignments = () => {
    return (
        <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4 relative">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 text-bodyText selector1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h3 className='font-bold'>Your Assignments</h3>
                </div>
            </header>

            <div className="@container/main flex flex-1 flex-col gap-2">
                <DataTable data={data} />
            </div>

        </section>
    )
}

export default Assignments