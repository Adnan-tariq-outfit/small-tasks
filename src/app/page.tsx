export default function Home() {
  const links = [
    { name: "infinite Scroll", href: "/infinite-scroll" },
    { name: "abort", href: "/abort" },
    { name: "todo-list", href: "/todo-list" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Welcome to My Website
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="bg-white shadow-md p-6 rounded-xl text-center hover:bg-blue-600 hover:text-white transition-all"
          >
            <h2 className="text-xl font-semibold">{link.name}</h2>
          </a>
        ))}
      </div>
    </main>
  );
}
