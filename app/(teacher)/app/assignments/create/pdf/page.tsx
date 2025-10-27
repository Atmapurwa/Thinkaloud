'use client'

import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'


const FormSchema = z.object({
    material: z.instanceof(File).refine((file) => file.size < 50000000, {
        message: 'Your resume must be less than 50MB.',
    }),
    questions: z
        .string()
        .min(1, { message: "number of questions is required" }),
    specifications: z
        .string()
        .min(1, { message: "number of questions is required" }),
})

const page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            questions: "3",
            specifications: "3",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsSubmitting(true);
        try {
            // const response = await fetch('/api/feedback', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         // description: data.feedback // Assuming your form has a description field
            //     }),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });
            // const resJson = await response.json()
            // if (resJson.status == 200) {
            //     // setOpen(false);
            //     form.reset();
            //     // toast.success('Feedback terkirim! Makasih yaa :)')
            // } else {
            //     // toast.error('Ada yang salah, silahkan coba lagi')
            // }
            alert("Submitted: " + JSON.stringify(data.questions));
            alert("Submitted: " + JSON.stringify(data.specifications));
            alert("Submitted: " + JSON.stringify(data.material.name));
            form.reset();
            if (fileRef.current) {
                // Make type file work in shadcn & react hook form: https://github.com/shadcn-ui/ui/discussions/2137
                fileRef.current.value = '';
            }
        } catch (error) {
            // toast.error('Gagal mengirim feedback, silakan coba lagi')
        }
        finally {
            setIsSubmitting(false); // Stop loading regardless of outcome
        }
    }

    return (
        <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4 relative">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 text-bodyText selector1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h3 className='font-bold'>Assignments</h3>
                </div>
            </header>

            <div className="@container/main flex flex-1 flex-col gap-2 overflow-y-scroll py-6 px-6">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-lg md:text-2xl font-bold'>Create New Assginment from PDF</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                        <CardAction>
                            <Button variant="destructive" asChild>
                                <Link href="/app/assignments">Cancel</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form className='grid gap-6 w-full'>
                                <FormField
                                    control={form.control}
                                    name="material"
                                    render={({ field: { value, onChange, ...fieldProps } }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Upload PDF Document</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...fieldProps}
                                                    ref={fileRef}
                                                    id="material-file"
                                                    type="file"
                                                    accept="application/pdf"
                                                    onChange={(event) =>
                                                        onChange(event.target.files && event.target.files[0])
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex flex-col md:flex-row gap-6 w-full'>
                                    <FormField
                                        control={form.control}
                                        name="questions"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Number of Questions</FormLabel>
                                                <FormControl>
                                                    <Input type='number' placeholder="10" min={1} {...field} onChange={(e) => field.onChange(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="specifications"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Number of Specifications</FormLabel>
                                                <FormControl>
                                                    <Input type='number' placeholder="10" min={1} {...field} onChange={(e) => field.onChange(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            disabled={isSubmitting || !form.watch('material')}
                            onClick={form.handleSubmit(onSubmit)}
                            type="submit"
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner />
                                    Generating...
                                </>
                            ) : (
                                "Generate Assignment"
                            )}
                        </Button>
                    </CardFooter>
                </Card>

            </div>

        </section>
    )
}

export default page