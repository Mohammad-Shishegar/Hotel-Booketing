import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

const useBooking = () => {

    const {bookingId} = useParams()

    const { isLoading, data: booking, error } = useQuery({
        queryKey: ['booking' , bookingId], // a uniqe name for this data for when we want this data from cache in another compoonent
            // up line => this is like dependency to refresh when id change like useEffect
        queryFn: () => getBooking(bookingId),
        retry:false // React Query by default try to fetch data 3 times if data cant load in first time so sometimes we dont need this feature
    })

    return {isLoading , error , booking}
}

export default useBooking