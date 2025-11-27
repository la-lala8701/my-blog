import { Article } from "@/app/components/Article";
import { EditButtons } from "@/app/components/EditButtons";
import { DeleteModal } from "./DeleteModal";

export const Post = () => {

  return (
    <>
      <DeleteModal />
      <Article />
      <EditButtons />
    </>
  );
};
