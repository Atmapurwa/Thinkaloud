import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BadgeCheckIcon, CircleCheck, CircleQuestionMark, Zap } from "lucide-react"

export default async function Page({
    params,
}: {
    params: Promise<{ responseID: string }>
}) {
    const { responseID } = await params
    return (
        <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">

            <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4 relative">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 text-bodyText selector1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h3 className='font-bold'>Assignments</h3>
                </div>
            </header>

            <div className="@container/main flex flex-1 flex-col gap-6 overflow-auto p-6">
                <h3 className="font-bold text-xl">Naufal Response</h3>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex gap-x-2"><Zap className="size-4" /> Summary</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt reiciendis consequuntur nihil? Facilis incidunt quisquam, perspiciatis repudiandae veritatis minima, magni quidem explicabo ipsa ducimus corrupti tenetur tempora quod molestiae quas nobis exercitationem veniam reprehenderit! Vero, in blanditiis sapiente veritatis distinctio omnis illum, quos architecto sunt voluptates ducimus debitis! Distinctio laborum doloremque amet, excepturi laudantium necessitatibus explicabo molestias, maiores adipisci repellat iste, recusandae minima reiciendis aliquid unde. Recusandae maiores, asperiores officia odit dolor labore illum eaque possimus temporibus corrupti iure quam vel optio! Dicta recusandae beatae ad adipisci blanditiis nisi provident corporis ducimus,imos possimus aliquid neque. Ipsa, a?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex gap-x-2"><BadgeCheckIcon className="size-4" /> Specifications</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                        <Item variant="outline" size="sm">
                            <ItemMedia>
                                <CircleCheck className="size-4" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemDescription>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorem laudantium consequatur ipsam est. Molestiae temporibus illum ex, reiciendis eos libero nulla facilis deserunt ipsam, modi quod doloribus, recusandae facere?
                                </ItemDescription>
                            </ItemContent>
                            {/* <ItemActions>
                                    <ChevronRightIcon className="size-4" />
                                </ItemActions> */}
                        </Item>
                        <Item variant="outline" size="sm">
                            <ItemMedia>
                                <CircleQuestionMark className="size-4" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemDescription>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel sint maiores deleniti voluptates ullam nam atque nobis culpa iure ipsum, delectus suscipit nesciunt sit numquam, ratione iste quos a facere earum. Odio nemo, pariatur corrupti perspiciatis aperiam reiciendis optio aspernatur?
                                </ItemDescription>
                            </ItemContent>
                            {/* <ItemActions>
                                    <ChevronRightIcon className="size-4" />
                                </ItemActions> */}
                        </Item>

                    </CardContent>
                    {/* <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter> */}
                </Card>


            </div>
        </section>
    )

}