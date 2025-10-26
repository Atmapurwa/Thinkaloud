import { redirect } from 'next/navigation'
// import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
// import { Subscription } from '@/types/subscription.types'
// import { PostgrestError } from '@supabase/supabase-js'
import { BadgePercent, Sparkle, Sparkles } from 'lucide-react'
import Link from 'next/link'

// Define a type for plan variants
type PlanVariant =
    | 'free'
    | 'akrab'
    | 'kenalan';

interface PlanProps {
    subs: string | null | undefined;
}

export default async function AccountPage() {
    // const supabase = await createClient()


    // const { data, error } = await supabase.auth.getUser()
    // if (error || !data?.user) {
    //     redirect('/login')
    // }

    // GET USER ID
    // const id = data.user?.id

    // GET PLAN NAME
    // let { data: subscription, error: errorSubs } = await supabase
    //     .from('subscription')
    //     .select('plan(name)')
    //     .eq("user_id", id)
    //     .single() as {
    //         data: Subscription | null,
    //         error: PostgrestError | null
    //     };

    // // GET CURRENT TOKEN VOICE 
    // let { data: voiceToken } = await supabase
    //     .from('subscription')
    //     .select('current_voice_token')
    //     .eq("user_id", id)
    //     .single()

    // let { data: dailyLimiToken } = await supabase
    //     .from('message')
    //     .select('daily_limit')
    //     .eq("user_id", id)
    //     .single()

    // const getPlanVariant = (): PlanVariant => {
    //     if (subscription?.plan?.name === null) return 'free';

    //     switch (subscription?.plan?.name) {
    //         case 'Pro':
    //             return 'akrab';
    //         case 'Plus':
    //             return 'kenalan';
    //         default:
    //             return 'free';
    //     }
    // };

    // const variant = getPlanVariant();


    return (

        <section className="flex-1 max-h-svh w-full flex flex-col mx-auto">
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h2 className='font-bold text-2xl'>Account</h2>
                </div>
            </header>

            <div className='space-y-6 p-6'>
                <div className='space-y-8'>
                    <div className='grid gap-y-3'>
                        <h2 className='font-bold text-xl'>Profile</h2>
                        <div className='flex gap-4 items-center'>
                            <Image
                                alt='profile picture'
                                width={1200}
                                height={1200}
                                // src={data.user.user_metadata.picture}
                                src={"/assets/img/userProfile.png"}
                                className="rounded-full size-16"
                                loading="lazy"></Image>
                            <div>
                                {/* <p className='text-lg'>{data.user.user_metadata.full_name}</p> */}
                                <p className='text-lg'>Lorem Ipsum</p>
                                {/* <p>{data.user.email}</p> */}
                                <p>Lorem@gmail.com</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section >


    )



}