import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings"

export const useDeleteBooking = () => {

    const queryClient = useQueryClient()

    const { isLoading: isDeleteing, mutate : deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            toast.success("cabins deleted successfully")
            queryClient.invalidateQueries({
                queryKey: ["bookings"]
            })
        },
        onError: (er) => toast.error(er.message)
    })
    return {isDeleteing , deleteBooking}
}