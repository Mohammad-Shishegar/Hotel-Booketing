import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { updateBooking } from '../../services/apiBookings'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useCheckout = () => {
    const queryClient = useQueryClient()

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: "checked-out"
        }),
        onSuccess: (data) => { // this data is data that we recive from upadteBooking()
            toast.success(`Booking #${data.id} successfully checked out`)
            queryClient.invalidateQueries({ active: true }) // active means that for all active query from the page
        },
        onError :  ()=> toast.error("There was an error while checking out")
    })
    return {checkout , isCheckingOut}
}

export default useCheckout