import {useMutation} from "@tanstack/react-query"
import { signUp as signUpApi} from "../../services/ApiAuth"
import {toast} from "react-hot-toast"


const useSignup = () => {

    const {mutate : signup , isLoading} = useMutation({
        mutationFn : signUpApi,
        onSuccess : (user)=>{   
            toast.success("Account successfully created! Pleased verufy the new account in users email address!")
        }
    })
    return{signup , isLoading}
}

export default useSignup