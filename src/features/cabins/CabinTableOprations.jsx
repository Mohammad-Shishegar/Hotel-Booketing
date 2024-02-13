import React from 'react'
import TableOprations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"


const cabinTableOprations = () => {

  return (
    <TableOprations>
      <Filter filterField ="discount" options={[
        {value : "all" , lable : "All"},
        {value : "with-discount" , lable : "With discount"},
        {value : "no-discount" , lable : "No discount"},
        ]}/>
    </TableOprations>
  )
}

export default cabinTableOprations