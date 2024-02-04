import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabins as deleteCabinApi } from "../../services/apiCabins"
import { toast } from "react-hot-toast"

export const useDeleteCabin = () => {

    const queryClient = useQueryClient()

    const { isLoading: isDeleteing, mutate : deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinApi(id),
        onSuccess: () => {
            toast.success("cabins deleted successfully")
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            })
        },
        onError: (er) => toast.error(er.message)
    })
    return {isDeleteing , deleteCabin}
}