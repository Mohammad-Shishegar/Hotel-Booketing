import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCabins } from '../../services/apiCabins'

const useCabins = () => {
    const { isLoading, data: cabins, error } = useQuery({
        queryKey: ['cabins'], // a uniqe name for this data for when we want this data from cache in another compoonent
        queryFn: getCabins
    })

    return {isLoading , error , cabins}
}

export default useCabins