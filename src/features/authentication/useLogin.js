import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useMutation , useQueryClient} from "@tanstack/react-query"
import { login as loginApi} from '../../services/ApiAuth'
import { toast } from 'react-hot-toast'


const useLogin = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {mutate : login , isLoading} = useMutation({
        mutationFn: ({email , password}) => loginApi({email , password}),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user) //chash data with user key
            navigate("/dashboard" , {replace:true})
        },
        onError: (er) => {
            toast.error("Provid incorrect email or password!")
        }
    })

    return {login , isLoading}
}

export default useLogin