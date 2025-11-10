import Link from "next/link";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Article } from "@/app/components/Article";


export default function Post() {

  return (
    <div>
      <Header />
      <Container>
        <Article />
        <Link href={`/post/${"id"}/edit`}>
          <button className="mt-8 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            記事を編集
          </button>
        </Link>
      </Container>
    </div>
  );
}
