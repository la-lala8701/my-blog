'use client';
import { Article } from "@/app/components/Article";
import { DeleteModal } from "./DeleteModal";
import { useState } from "react";

export const Post = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <DeleteModal showModal={showModal} setShowModal={setShowModal} />
      <Article setShowModal={setShowModal} />
    </>
  );
};
