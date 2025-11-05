import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Article } from "@/app/components/Article";


export default function Post() {

  return (
    <div>
      <Header />
      <Container>
        <Article />
      </Container>
    </div>
  );
}
