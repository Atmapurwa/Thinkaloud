import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

const Materials = () => {
    return (
        <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4 relative">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 text-bodyText selector1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h3 className='font-bold'>Material</h3>
                </div>
            </header>

            <div>

            </div>

        </section>
    )
}

export default Materials