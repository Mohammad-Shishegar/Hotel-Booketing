import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error.message);

  return data;
}

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session)
    return null
  
  const {data , error} = await supabase.auth.getUser()
  console.log(data)

  if (error) throw new Error(error.message);

  return data?.user;
}

export const logout = async () => {
  const {error} = await supabase.auth.signOut()

  if (error) throw new Error(error.message);
}