import React, { useState } from 'react'
import CreateCabinForm from './CreateCabinForm'
import Button from '../../ui/Button'
import Modal from "../../ui/Modal"

const AddCabin = () => {
    const [isOpenMoadal, setIsOpenMoadal] = useState(false)
    return (
        <div>
            <Button onClick={() => setIsOpenMoadal(cv => !cv)}>Add new cabin</Button>
            {isOpenMoadal &&
                <Modal onClose = {()=>setIsOpenMoadal(false)}>
                    <CreateCabinForm changeOpen={setIsOpenMoadal}></CreateCabinForm>
                </Modal>}
        </div>
    )
}

export default AddCabin