import React from 'react'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRight } from "react-icons/hi"
import { useLogout } from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini'

const Logout = () => {

    const {logout , isLoading} = useLogout()

    return (
        <ButtonIcon disabled={isLoading} onClick={()=> logout()}>
            {!isLoading ? <HiArrowRight /> : <SpinnerMini/>}
        </ButtonIcon>
    )
}

export default Logout