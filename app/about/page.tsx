import { Container } from "../components/Container";
import { Header } from "../components/Header";

export default function About() {
  return (
    <div>
      <Header />
      <Container>
        <h1 className="text-5xl font-bold mb-8">タイトルが入ります</h1>
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
          <div>
            <p className="text-base">UserName</p>
            <p className="text-sm text-gray-500">2025年04月08日</p>
          </div>
        </div>
        <div className="mt-16 space-y-4">
          <p>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </p>
          <p>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </p>
        </div>
      </Container>
    </div>
  );
}
