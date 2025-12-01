import { EditPost } from "@/app/components/EditPost";

export default async function EditPage({ params }: { params: { id: string } }) {
  const pageId = await params;
  const id = pageId.id;
   
  return (
    <EditPost id={id} />
  );
}
