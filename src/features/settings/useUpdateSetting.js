import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createEditCabin } from '../../services/apiCabins'
import { updateSetting as  updateSettingApi} from '../../services/apiSettings'

const useUpdateSetting = () => {
    const queryClient = useQueryClient()
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi    ,
        onSuccess: () => {
            toast.success("Setting successfully edited")
            queryClient.invalidateQueries({ queryKey: ["Settings"] })
        },
        onError: (err) => toast.error(err.message)
    })
    return {updateSetting , isUpdating}
}

export default useUpdateSetting

