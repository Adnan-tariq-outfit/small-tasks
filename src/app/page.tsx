export default function Home() {
  const links = [
    { name: "infinite Scroll", href: "/infinite-scroll" },
    { name: "abort", href: "/abort" },
    { name: "todo-list", href: "/todo-list" },
  ];

  return (
    <main>
      <h1>Welcome to My Website</h1>

      <div>
        {links.map((link) => (
          <a key={link.name} href={link.href}>
            <h2>{link.name}</h2>
          </a>
        ))}
      </div>
    </main>
  );
}
