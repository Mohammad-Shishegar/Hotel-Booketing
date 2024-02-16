import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCabins } from '../../services/apiCabins'
import { getBooking, getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

const useBookings = () => {

    const [searchParams] = useSearchParams()

    //Filter
    const filterValue = searchParams.get("status")
    const filter = !filterValue || filterValue === "all" ? null 
    // :{field : "totalPrice" , value : 5000 , method: "gte"}
    : {field : "status" , value : filterValue}

    //Sort By
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
    const [field , direction] = sortByRaw.split("-")
    const sortBy = {field , direction}

    const { isLoading, data: bookings, error } = useQuery({
        queryKey: ['booking' , filter , sortBy], 
        // a uniqe name for this data for when we want this data from cache in another compoonent 
        // and this like use Effect dependency  
        queryFn: () => getBookings({filter})
    })

    return {isLoading , error , bookings}
}

export default useBookings