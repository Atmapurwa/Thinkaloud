import * as React from "react"
import {
    BookOpenText,
    BookTextIcon,
    HeartPlus,
    Home,
    LogOut,
    Phone,
    User,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { createClient } from "@/utils/supabase/server"
// import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
// import Feedback from "./Feedback"
// import Plan from "./Plan"
// import { Subscription } from "@/types/subscription.types"
// import { PostgrestError } from "@supabase/supabase-js"

const dataNav = {
    navMain: [
        {
            title: "Assignments",
            url: "/app/assignments",
            icon: BookOpenText,
        },
        {
            title: "Materials",
            url: "/app/materials",
            icon: BookTextIcon,
        },
        {
            title: "Profile",
            url: "/app/profile",
            icon: User,
        },
    ],
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // const supabase = await createClient()

    // const { data, error } = await supabase.auth.getUser()
    // // if (error || !data?.user) {
    // //     // redirect('/login')
    // // }

    // // GET USER ID
    // const id = data.user?.id

    // let { data: subscription, error: errorSubs } = await supabase
    //     .from('subscription')
    //     .select('plan(name)')
    //     .eq("user_id", id)
    //     .single() as {
    //         data: Subscription | null,
    //         error: PostgrestError | null
    //     };
    // if (errorSubs) {
    //     throw new Error(errorSubs.message);
    // }
    // if (!subscription) {
    //     throw new Error("Data plan tidak lengkap atau kosong.");
    // }


    // const signOut = async () => {
    //     "use server";
    //     const supabase = await createClient();

    //     const { error } = await supabase.auth.signOut();
    //     if (error) {
    //         console.error("Error signing out:", error);
    //     }
    //     redirect("/login");
    // };

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <Image
                                    className="h-auto w-full"
                                    src="/assets/img/logo/Thinkaloud_transparent.png"
                                    alt="Thinkaloud Logo"
                                    width={1935}
                                    height={512}
                                    priority
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dataNav.navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span className="font-medium">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {/* FEEDBACK */}
                            {/* <SidebarMenuItem>
                                <Feedback />
                            </SidebarMenuItem> */}


                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* {data?.user &&
                    <SidebarGroup className="mt-auto">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={signOut}>
                                        <LogOut />
                                        <span className="font-medium font-encode-sans">Log out</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                } */}

            </SidebarContent>
            {/* <SidebarFooter>
                {data?.user &&
                    <Plan subs={subscription?.plan?.name} />
                }
            </SidebarFooter> */}
        </Sidebar>
    )
}
