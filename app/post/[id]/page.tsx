import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Article } from "@/app/components/Article";
import { EditButtons } from "@/app/components/EditButtons";

export default function Post() {

  return (
    <div>
      <Header />
      <Container>
        <Article />
        <EditButtons />
      </Container>
    </div>
  );
}
