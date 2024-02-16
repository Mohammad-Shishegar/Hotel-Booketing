import supabase, { supabaseUrl } from "./supabase"

export const getCabins = async () => {

    let { data, error } = await supabase
        .from('cabins')
        .select('*')


    if (error) {
        console.error(error)
        throw new Error("Cabins could not be loaded")
    }
    return data
}


export const deleteCabins = async (id) => {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error("Cabins could not be loaded")
    }
    return data
}

export const createEditCabin = async (newCabin, id) => {


    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl) // for edit request

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')


    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

    //1-create/edit  cabin
    let query = supabase.from("cabins")

    //A. Create
    if (!id)
        query = query.insert([{ ...newCabin, image: imagePath }])

    //B. Edit
    if (id)
        query = query.update([{ ...newCabin, image: imagePath }])
            .eq('id', id)
            .select()

    const { error, data } = await query.select().single()

    if (error) {
        console.error(error)
        throw new Error("Cabins could not be created")
    }

    //2-upload image
    if(hasImagePath)
        return data

    const { error: storageError } = await supabase.storage
        .from('cabins-images')
        .upload(imageName, newCabin.image)

    //3-delete the cabin if there was an error uploading image
    if (storageError) {
        const { data, error } = await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)

        console.error(error)
        throw new Error("CAbing Image Could not uploaded and the cabin was not created")
    }

    return data

}