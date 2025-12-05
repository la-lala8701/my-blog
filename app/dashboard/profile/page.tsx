export default function ProfilePage() {
  return (
    <div className="max-w-md mx-auto rounded-lg p-6 shadow-md">
      {/* アイコン画像 */}
      <div className="w-32 h-32 bg-gray-300 block mx-auto rounded-full"></div>
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p className="text-gray-600 mt-10">
            A brief bio about John Doe goes here. Passionate about web development and design.
        </p>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
        <div>
            <h3 className="text-xl font-semibold mt-8 mb-4">Contact Information</h3>
            <div className="text-gray-700">
                <p>Email: exampe@email.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
        </div>
      </div>
    </div>
  );
}
