import supabase, { supabaseUrl } from "./supabase";

export const signUp = async ({email , password , fullName}) => {


  const {data , error} = await supabase.auth.signUp({
    email ,
    password ,
    options:{
      data: {
        fullName,
        avatar: "",
      },
    }
  })
  
  if (error) throw new Error(error.message);

  return data;
}

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

  if (error) throw new Error(error.message);

  return data?.user;
}

export const logout = async () => {
  const {error} = await supabase.auth.signOut()

  if (error) throw new Error(error.message);
}

export const updateCurrentUser = async ({fullName , avatar , password}) => {

  //1. update password or fullname
  let updateUser 
  if(password) updateUser = {password}
  if(fullName) updateUser = {data : {fullName}}

  const {data , error} = await supabase.auth.updateUser(updateUser)

  if (error) throw new Error(error.message);
  if(!avatar)
    return data

  //2. upload avatar image 
  const fileName = `avatar-${data.user.id}-${Math.random()}`
  const {error : storageError} = await supabase.storage.from("avatar").upload(fileName , avatar)

  if (storageError) throw new Error(storageError.message);

  //3. update avatar in user
  const {data : updatedUser , error : error2 } = await supabase.auth.updateUser({
    data:{
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`
    }
  })

  if (error2) throw new Error(error2.message);
  return updatedUser
}