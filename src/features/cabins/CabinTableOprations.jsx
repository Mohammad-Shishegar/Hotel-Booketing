import React from 'react'
import TableOprations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"
import SortBy from '../../ui/SortBy'


const cabinTableOprations = () => {

  return (
    <TableOprations>
      <Filter filterField ="discount" options={[
        {value : "all" , lable : "All"},
        {value : "with-discount" , lable : "With discount"},
        {value : "no-discount" , lable : "No discount"},
        ]}/>
        <SortBy options={[
           {value : "name-asc" , label : "Sort By Name (A-Z)"},
           {value : "name-desc" , label : "Sort By Name (Z-A)"},
           {value : "regularPrice-asc" , label : "Sort By Prise (low first)"},
           {value : "regularPrice-desc" , label : "Sort By Prise (height first)"},
           {value : "maxCapacity-asc" , label : "Sort By Capavity (low first)"},
           {value : "maxCapacity-desc" , label : "Sort By Capavity (height first)"},
        ]}/>
    </TableOprations>
  )
}

export default cabinTableOprations