export default function Loading() {
  return (
    <div className="flex justify-center my-20 space-x-4" aria-label="読み込み中">
      <div className="animate-ping h-2 w-2 bg-gray-600 rounded-full"></div>
      <div className="animate-ping h-2 w-2 bg-gray-600 rounded-full"></div>
      <div className="animate-ping h-2 w-2 bg-gray-600 rounded-full"></div>
    </div>
  );
}