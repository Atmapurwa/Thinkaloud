'use client'

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState } from 'react'
import z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const FormSchema = z.object({
    title: z
        .string()
        .min(1, { message: "number of questions is required" }),
    description: z
        .string()
        .min(1, { message: "number of questions is required" }),
    question: z
        .string()
        .min(1, { message: "number of questions is required" }),
})

const page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema)
    })

    return (
        <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4 relative">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h3 className='font-bold'>Assignments</h3>
                </div>
            </header>

            <div className="@container/main flex flex-1 flex-col gap-6 overflow-auto md:overflow-hidden p-6">
                <div className='flex justify-between'>
                    <h2 className="font-bold text-2xl">Create New Assignment</h2>
                    <Button variant="destructive" asChild>
                        <Link href="/app/assignments">Cancel</Link>
                    </Button>
                </div>


                <Card className='md:min-h-0 h-full flex flex-1 flex-col'>
                    <CardHeader>
                        <CardTitle>Assignment from Scratch</CardTitle>
                    </CardHeader>
                    <CardContent className='flex-1 min-h-0'>
                        <Form {...form}>
                            <form className='flex flex-col md:flex-row gap-6 w-full h-full'>
                                <div className='grid gap-6 w-full md:w-6/12 content-start'>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input type='number' placeholder="10" min={1} {...field} onChange={(e) => field.onChange(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input type='number' placeholder="10" min={1} {...field} onChange={(e) => field.onChange(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* <Separator orientation='vertical' /> */}
                                <Tabs defaultValue="questions" className='w-full min-h-0'>
                                    <TabsList className='w-full'>
                                        <TabsTrigger value="questions">Questions</TabsTrigger>
                                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="questions" className='grid min-h-20'>
                                        <div className='flex-1 overflow-y-auto mb-4'>
                                            <ul className='space-y-2'>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>
                                                <li className='flex'>
                                                    <span>apa itu pki</span>
                                                </li>

                                            </ul>
                                        </div>
                                        <div className="flex gap-2 w-full shrink-0 items-end">
                                            <Input type="email" placeholder="Enter a new question" />
                                            <Button type="submit" variant="outline">
                                                Add Question
                                            </Button>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="specifications">Change your password here.</TabsContent>
                                </Tabs>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className='w-full'
                            disabled={isSubmitting}
                            // onClick={form.handleSubmit(onSubmit)}
                            type="submit"
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner />
                                    Generating...
                                </>
                            ) : (
                                "Create Assignment"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

        </section>
    )
}

export default page