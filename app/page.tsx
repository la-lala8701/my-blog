import Link from "next/link"
import { Header } from "./components/Header"

export default function Home() {
  return (
    <div>
      <Header />
      <h1>
        ブログサイト
      </h1>
      <div>
        <Link href="/about">
          <div>
            <img src="https://placehold.jp/400x300.png" alt="" />
          </div>
          <p>タイトルが入ります</p>
          <p>2025年04月08日</p>
        </Link>
      </div>
    </div>
  );
}
