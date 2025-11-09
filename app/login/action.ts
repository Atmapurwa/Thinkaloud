"use server";

import { createClient } from "@/lib/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleSignInWithGoogle = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
    },
  });

  if (data.url) {
    // const user = await supabase.auth.getUser()
    // tempChatToDatabase(String(user.data.user?.id))
    redirect(data.url); // use the redirect API for your server framework
  }
};