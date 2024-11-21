import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Hotel } from "lib";

export default function HotelDetails() {
  const { id } = useParams<{ id: string }>();

  return <div>Hotel</div>;
}
