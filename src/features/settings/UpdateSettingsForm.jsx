import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner"
import useSettings from './useSettings';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {

  const { isLoading, settings: {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breackfastPrice } = {}
    , error } = useSettings()

  const { isUpdating, updateSetting } = useUpdateSetting()

  const handleUpdate = (e, fild) => {
    const { value } = e.target
    if (!value)
      return
    updateSetting({ [fild]: value })
  }

  if (isLoading) return <Spinner />

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isLoading}
          onBlur={e => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength} disabled={isLoading}
          onBlur={e => handleUpdate(e, "maxBookingLength")} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isLoading}
          onBlur={e => handleUpdate(e, "maxGuestsPerBooking")} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breackfastPrice}
          disabled={isLoading}
          onBlur={e => handleUpdate(e, "breackfastPrice")} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
