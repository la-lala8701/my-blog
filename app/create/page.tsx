import { Container } from "../components/Container";
import { Header } from "../components/Header";

export default function CreatePage() {
  return (
    <div>
      <Header />
      <Container>
        <h1 className="text-2xl font-bold mb-4">記事作成</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">タイトル</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">内容</label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full"
              rows={10}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
          >
            作成
          </button>
        </form>
      </Container>
    </div>
  );
}
