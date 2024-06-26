import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin";
import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";

import {
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineSquare2Stack,
} from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState();
  const { isPending, mutate } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const { id, name, maxCapacity, image, regularPrice, description, discount } =
    cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      image,
      regularPrice,
      description,
      discount,
    });
  }
  return (
    <>
      <TableRow role="row">
        <Img src={image}></Img>
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} people.</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <HiOutlineSquare2Stack
            style={{
              fontSize: "2rem",
            }}
            onClick={handleDuplicate}
            disabled={isCreating}
          ></HiOutlineSquare2Stack>
          <HiOutlinePencil
            style={{
              fontSize: "2rem",
            }}
            onClick={() => setShowForm(!showForm)}
            disabled={isPending}
          ></HiOutlinePencil>
          <HiOutlineTrash
            style={{
              fontSize: "2rem",
            }}
            onClick={() => mutate(id)}
            disabled={isPending}
          ></HiOutlineTrash>
        </div>
      </TableRow>
      {showForm && (
        <CreateCabinForm cabinToEdit={cabin} setShowForm={setShowForm} />
      )}
    </>
  );
}

export default CabinRow;
