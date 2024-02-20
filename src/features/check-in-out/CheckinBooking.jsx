import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import CheckBox from "../../ui/Checkbox"
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings"

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false)
  const { booking, isLoading } = useBooking()
  const [addBreackfast, setAddBreakfast] = useState(false)

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false)
  }, [booking])

  const { checkin, isCheckingIn } = useCheckin()

  const { settings, isLoading: isLoadingSetting } = useSettings()

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breackfastPrice * numNights * numGuests || ""

//  const optionalBreakfastPrice = 10

  function handleCheckin() {
    if (!confirmPaid)
      return

      if(addBreackfast){
        checkin({bookingId , breakfast : {
          hasBreakfast : true ,
          extrasPrice : optionalBreakfastPrice ,
          totalPrice : totalPrice +  optionalBreakfastPrice
        }})
      }
      else{
        checkin({bookingId , breakfast : {}})
      }
  }

  if (isLoading || isLoadingSetting)
    return <Spinner />

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (<Box>
        <CheckBox checked={addBreackfast} onChange={() => {
          setAddBreakfast(cv => !cv)
          setConfirmPaid(false)
        }}
          id={"breakfast"}
        >
          Want add breakfast to {optionalBreakfastPrice} ?
        </CheckBox>
      </Box>)}

      <Box>
        <CheckBox
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid(cv => !cv)}
          checked={confirmPaid}
          id={"confirm"}
        >
          I confirm that {guests.fullName} has paid the total amount {" "} {
            !addBreackfast ? formatCurrency(totalPrice) : 
            `${formatCurrency(totalPrice + optionalBreakfastPrice)} 
              (${formatCurrency(totalPrice)}) + 
              (${formatCurrency(optionalBreakfastPrice)})
            `
          }
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
