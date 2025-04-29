export default function UserCard({ username }: { username: string }) {
  return (
    <a
      href={`https://www.instagram.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white shadow rounded p-4 hover:shadow-md transition"
    >
      <p className="text-center text-lg font-semibold text-gray-800">
        @{username}
      </p>
      <p className="text-center text-sm text-blue-600 mt-1">
        Profili Görüntüle
      </p>
    </a>
  );
}
