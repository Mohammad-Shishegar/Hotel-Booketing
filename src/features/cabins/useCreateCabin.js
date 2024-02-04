import React from 'react'
import { createEditCabin } from '../../services/apiCabins'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

const useCreateCabin = () => {
    const queryClient = useQueryClient()
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: newCabin => createEditCabin(newCabin),
        onSuccess: () => {
            toast.success("New cabin successfully created")
            queryClient.invalidateQueries({ queryKey: ["cabins"] })
            //reset()  // we cant use this method in here because this come from react hook form 
        },
        onError: (err) => toast.error(err.message)
    })
    return{createCabin , isCreating}
}

export default useCreateCabin