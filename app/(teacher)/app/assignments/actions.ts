"use server"

import { createClient } from "@/lib/server"
import { revalidatePath } from "next/cache"

export async function deleteAssignment(assignmentId: number) {
    try {
        const supabase = await createClient()
        
        // Get authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
            return {
                success: false,
                error: "User not authenticated"
            }
        }
        
        // Delete assignment from database
        // Only delete if the assignment belongs to the current user
        const { error } = await supabase
            .from('assignments')
            .delete()
            .eq('id', assignmentId)
            .eq('instructor_id', user.id)
        
        if (error) {
            console.error('Error deleting assignment:', error)
            return {
                success: false,
                error: error.message
            }
        }
        
        // Revalidate the assignments page to refresh the data
        revalidatePath('/app/assignments')
        
        return {
            success: true
        }
    } catch (err) {
        console.error('Unexpected error:', err)
        return {
            success: false,
            error: 'An unexpected error occurred'
        }
    }
}
