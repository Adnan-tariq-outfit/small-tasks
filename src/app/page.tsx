"use client";
export default function Home() {
  const links = [
    { name: "infinite Scroll", href: "/infinite-scroll" },
    { name: "Abort Request", href: "/abort" },
    { name: "Todo App", href: "/todo-list" },
    { name: "Quiz App", href: "/quiz-app" },
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

      <h1>Clipbaord Events</h1>
      <input
        onCopy={() => console.log("Copied")}
        onCut={() => console.log("Cut")}
        onPaste={(e) => {
          const text = e.clipboardData.getData("text");
          console.log("Pasted:", text);
        }}
      />
    </main>
  );
}
