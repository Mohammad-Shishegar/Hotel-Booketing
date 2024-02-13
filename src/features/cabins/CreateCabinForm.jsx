import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  `;

function CreateCabinForm({ cabinToEdit = {}, changeOpen }) {

  const { id: editId, ...editValue } = cabinToEdit
  const isEditSession = Boolean(editId)

  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValue : {}
  })

  const { errors } = formState

  const { isCreating, createCabin } = useCreateCabin()

  const { isEditing, editCabin } = useEditCabin()

  const isWorking = isCreating || isEditing


  const onSubmit = (data) => {

    const image = typeof data.image === 'string' ? data.image : data.image[0]

    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId }, {
        onSuccess: () => {
          reset()
          changeOpen?.(cv => !cv)
        }
      })
    else
      createCabin({ ...data, image: image }, {
        onSuccess: () => {
          changeOpen?.(cv => !cv)
          reset()
        }
      })
    // mutate({...data , image : data.image[0]})
  }

  const onError = (er) => {
    // console.log(er)
  }

  if (isWorking)
    return <Spinner />

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={changeOpen ? "modal" : "regular"}>
      {/* <FormRow2>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", { required: "This fild is required" })} />
      {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow2> */}
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required: "This fild is required" })} />
      </FormRow>



      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", { required: "This fild is required", min: { value: 1, message: "Capacity should be at least 1" } })} />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", { required: "This fild is required" })} />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0}  {...register("discount", {
          required: "This fild is required", min: {
            value: 0
            , message: "Capacity should be at least 1"
          }
          , validate: (value) => value <= getValues().regularPrice || "Discount Should be less than regular price"
        })} />
      </FormRow>

      <FormRow label={"Description for website"} error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue=""  {...register("description", { required: "This fild is required" })} />
      </FormRow>

      <FormRow label={"image"}>
        <FileInput id="image" type="file" accept="image/*" {...register("image", { required: isEditSession ? false : "This fild is required" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => changeOpen?.(cv => !cv)}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Add Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
