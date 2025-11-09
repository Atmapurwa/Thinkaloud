import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

import { DataTable } from './data-table'
import { createClient } from '@/lib/server'
import { redirect } from 'next/navigation'

const Assignments = async () => {
    const supabase = await createClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
        redirect('/login')
    }
    
    // Fetch assignments from database for the current user
    const { data: assignments, error } = await supabase
        .from('assignments')
        .select('id, title, created_at, description')
        .eq('instructor_id', user.id)
        .order('created_at', { ascending: false })
    
    if (error) {
        console.error('Error fetching assignments:', error)
    }
    
    // Transform data to match the expected schema
    const transformedData = (assignments || []).map(assignment => ({
        id: assignment.id,
        title: assignment.title,
        createdAt: new Date(assignment.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        responses: 0 // TODO: Count responses from responses table when available
    }))
    
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
                <DataTable data={transformedData} />
            </div>
        </section>
    )
}

export default Assignments