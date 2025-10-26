"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  // const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/chat", "layout");
  redirect("/chat");
}

export async function signup(formData: FormData) {
  // const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/chat", "layout");
  redirect("/chat");
}

export const handleSignInWithGoogle = async () => {
  // const supabase = await createClient();

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

async function tempChatToDatabase(user_id: string) {
  try {
    // const supabase = await createClient();
    let chatHistory = sessionStorage.getItem("tempChat") || [];
    const { data, error } = await supabase.from("message").insert([
      {
        user_id: user_id,
        chat_history: { messages: chatHistory },
      },
    ]);
  } catch (e) {
    throw e;
  }
}
