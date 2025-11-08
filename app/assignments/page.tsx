import CallApp from '@/components/core/call/app'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { getAppConfig } from '@/lib/livekit/utils'
import { headers } from 'next/headers'

export default async function page() {
    const hdrs = await headers();
    const appConfig = await getAppConfig(hdrs);

    return (
        <section className="h-full flex flex-col mx-auto w-full overflow-hidden max-h-dvh">
            page
        </section>
    )
}
