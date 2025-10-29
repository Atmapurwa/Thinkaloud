import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Lightbulb, ShieldAlertIcon } from "lucide-react"
import Link from "next/link"
import { DataTable } from "./data-table"
import { columns } from "./column"

import data from "./data.json"


export default async function Page({
    params,
}: {
    params: Promise<{ assignmentId: string }>
}) {
    const { assignmentId } = await params;

    return (
        <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4 relative">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 text-bodyText selector1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h3 className='font-bold'>Assignments</h3>
                </div>
            </header>

            <div className="@container/main flex flex-1 flex-col gap-6 overflow-auto md:overflow-hidden p-6">
                <div className='flex justify-between'>
                    <h2 className="font-bold text-2xl">{assignmentId} Responses</h2>
                    <Button variant="destructive" asChild>
                        <Link href="/app/assignments">Back to All Assignments</Link>
                    </Button>
                </div>

                <Item variant="outline">
                    <div className="grid bg-gray-100 rounded border gap-y-2 p-6 text-center">
                        <h3 className="text-3xl">1</h3>
                        <p>Responses</p>
                    </div>
                    <Separator orientation="vertical" />
                    <ItemContent>
                        <ItemTitle><Lightbulb /> Summary of Responses</ItemTitle>
                        <ItemDescription>
                            No summary available yet.
                        </ItemDescription>
                    </ItemContent>
                </Item>

                <h3 className="font-medium text-xl">All Responses</h3>

                <DataTable columns={columns} data={data} />
            </div>

        </section>
    )
}