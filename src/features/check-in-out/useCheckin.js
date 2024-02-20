import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { updateBooking } from '../../services/apiBookings'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useCheckin = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({bookingId , breakfast}) => updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true ,
            ...breakfast
        }),
        onSuccess: (data) => { // this data is data that we recive from upadteBooking()
            toast.success(`Booking #${data.id} successfully checked in`)
            queryClient.invalidateQueries({ active: true }) // active means that for all active query from the page
            navigate("/")
        },
        onError :  ()=> toast.error("There was an error while checking in")
    })
    return {checkin , isCheckingIn}
}

export default useCheckin