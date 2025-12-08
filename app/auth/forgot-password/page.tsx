export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">パスワード再設定</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">メールアドレス</label>
          <input
            type="email"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
        >
          送信
        </button>
      </form>
    </>
  );
}   