import React from 'react'
import Stat from './Stat'
import { HiOutlineBackspace, HiOutlineBriefcase, HiOutlineCalendar, HiOutlineCash, HiOutlineChartBar ,} from "react-icons/hi"
import { formatCurrency } from '../../utils/helpers'

const Stats = ({ bookings, confirmedStays , numDays , cabinsCount}) => {

    //1-
    const numBooking = bookings.length

    //2-
    const sales = bookings.reduce((acc ,cur)=> acc + cur.totalPrice , 0 )

    //3-
    const checkins = confirmedStays.length

    //4-
    //num check in nights / num available nights (num days * num cabins)
    const occupation = confirmedStays.reduce((acc , cur)=>acc + cur.numNights , 0) /
    (numDays * cabinsCount)

    return (
        <>
            <Stat
                title={"Bookings"}
                color={"blue"}
                icon={<HiOutlineBriefcase />}
                value={numBooking}
            />
            <Stat
                title={"ُSales"}
                color={"green"}
                icon={<HiOutlineCash />}
                value={formatCurrency(sales)}
            />
            <Stat
                title={"Check ins"}
                color={"indigo"}
                icon={<HiOutlineCalendar/>}
                value={checkins}
            />
            <Stat
                title={"Occupancy rate"}
                color={"yellow"}
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + "%"}
            />
        </>
    )
}

export default Stats