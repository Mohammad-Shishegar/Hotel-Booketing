import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowUp } from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking()
  const navigate = useNavigate()

  // const status = "checked-in";
  const { status, id: bookingId } = booking || "";

  const { checkout, isCheckingOut } = useCheckout()
  const { isDeleteing, deleteBooking } = useDeleteBooking()

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading)
    return <Spinner />

  return (
    <>
      <Modal>
        <Row type="horizontal">

          <HeadingGroup>
            <Heading as="h1">Booking {bookingId}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          {status === "unconfirmed" && (<Button
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>)}


          {status === "checked-in" && (<Button
            icon={<HiArrowUp />}
            onClick={() => { checkout(bookingId) }}
            disabled={isCheckingOut}
          >
            Check out
          </Button>)}

          <Modal.Open opens={"delete"}>
            <Button disabled={isDeleteing} variation="danger">Delete Booking</Button>
          </Modal.Open>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>


          <Modal.Window name={"delete"}>
            <ConfirmDelete resourceName={"booking"} disabled={isDeleteing}
              onConfirm={() => deleteBooking(bookingId,{
                onSettled: () => navigate(-1) // onSettled means do a thing if success or error 
              })}
            />
          </Modal.Window>

        </ButtonGroup >
      </Modal>
    </>
  );
}

export default BookingDetail;
