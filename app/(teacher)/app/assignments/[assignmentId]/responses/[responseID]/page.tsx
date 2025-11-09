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
                <h3 className="font-bold text-xl">Ejenia Response</h3>
                <Card className="bg-primary-foreground">
                    <CardHeader>
                        <CardTitle className="flex gap-x-2"><Zap className="size-4" /> Summary</CardTitle>
                        <CardDescription>The student demonstrated a clear understanding of basic scientific concepts such as living and non-living things, forces, and the importance of observation in science. Their explanation was written in complete sentences and used age-appropriate vocabulary. The response showed curiosity and effort in connecting science to everyday life, though a few examples could be more detailed.</CardDescription>
                    </CardHeader>
                    {/* <CardContent>
                        <p>Card Content</p>
                    </CardContent> */}
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex gap-x-2"><BadgeCheckIcon className="size-4" /> Specifications</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                        <Item variant="outline" size="sm" className="bg-primary-foreground text-primary">
                            <ItemMedia>
                                <CircleCheck className="size-4" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemDescription className="text-primary">
                                    Comprehension: The student accurately explained the main ideas and demonstrated an understanding of simple scientific principles.
                                </ItemDescription>
                            </ItemContent>

                        </Item>
                        <Item variant="outline" size="sm" className="bg-primary-foreground text-primary">
                            <ItemMedia>
                                <CircleQuestionMark className="size-4" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemDescription className="text-primary">
                                    Clarity and Expression: Sentences were clear and well-structured, with minor grammatical errors that did not affect meaning.
                                </ItemDescription>
                            </ItemContent>
                        </Item>
                        <Item variant="outline" size="sm" className="bg-amber-100 text-amber-700">
                            <ItemMedia>
                                <CircleQuestionMark className="size-4" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemDescription className="text-amber-700">
                                    Application: The student related science concepts to real-world examples, showing the ability to apply classroom learning to daily experiences.
                                </ItemDescription>
                            </ItemContent>
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