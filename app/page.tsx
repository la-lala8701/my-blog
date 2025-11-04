import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Posts } from "./components/Posts";

export default function Home() {
  return (
    <div>
      <Header />
      <Container>
        <Posts />
      </Container>
    </div>
  );
}
