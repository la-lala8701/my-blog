export const ManagePostsSearch = () => {
  return (
    <div className="w-full max-w-md ml-auto flex mb-12 gap-2">
      <input
        type="text"
        name="search"
        placeholder="Search posts..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <details className="relative">
        <summary className="inline-block cursor-pointer bg-gray-200 px-3 py-2 rounded-md list-none" role="button">Sort</summary>
        <div className="mt-2 p-4 border rounded-lg bg-gray-50 absolute right-0 w-48 shadow-lg">
          <label className="block mb-2">
            <input type="radio" name="filter" className="mr-2" />
            公開中のみ表示
          </label>
          <label className="block">
            <input type="radio" name="filter" className="mr-2" />
            非公開のみ表示
          </label>
        </div>
      </details>
    </div>
  );
}