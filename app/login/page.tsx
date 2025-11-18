import { Container } from "../components/Container";

export default function LoginPage() {
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">メールアドレス</label>
          <input
            type="email"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">パスワード</label>
          <input
            type="password"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
        >
          ログイン
        </button>
      </form>
    </Container>
  );
}
