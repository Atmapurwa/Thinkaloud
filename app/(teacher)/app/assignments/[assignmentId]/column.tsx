"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StudentResponses = {
    id: string
    student: string
    summary: string
    length: number
    submitted: string
    view: string
}


export const columns: ColumnDef<StudentResponses>[] = [
    {
        accessorKey: "student",
        header: "Student",
    },
    {
        accessorKey: "summary",
        header: "Summary",
    },
    {
        accessorKey: "length",
        header: "Length",
    },
    {
        accessorKey: "submitted",
        header: "Submitted",
    },
    {
        accessorKey: "view",
        header: "View",
        cell: ({ row }) => (
            <Button
                // asChild
                variant="outline"
                size="sm"
            >
                <a href={`/app/assignments/assignmentID/responses/${row.original.view}`}>
                    View Responses
                </a>
                {/* View Response */}
            </Button>

        ),
    },
]