import { Container } from "../../components/Container";
import { Article } from "@/app/components/Article";
import { EditButtons } from "@/app/components/EditButtons";

export default function Post() {
  return (
    <Container>
      <Article />
      <EditButtons />
    </Container>
  );
}
