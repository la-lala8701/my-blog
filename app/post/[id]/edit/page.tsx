export default function EditPage() {
  return (
    <div className="max-w-3xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8">記事編集ページ</h1>
      <form action="">
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="title">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="content">
            内容
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full border border-gray-300 rounded-md p-2"
            rows={6}
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="author">
            著者名
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          更新
        </button>
      </form>
    </div>
  );
}
