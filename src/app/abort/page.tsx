"use client";
import { useEffect, useRef, useState } from "react";

interface DataInt {
  id: string;
  title: string;
}

const FetchWithAbort = () => {
  const [query, setQuery] = useState(""); // filter/search input
  const [data, setData] = useState<DataInt[]>([]);
  const [loading, setLoading] = useState(false);

  // Hold AbortController across renders
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = async (search: string) => {
    // Cancel previous request if still running
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Make a new controller for current request
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?title_like=${search}`,
        { signal: controller.signal }
      );

      const json = await res.json();

      setData(json); // update results
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Previous request cancelled");
      } else {
        console.error("Fetch error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Whenever query changes → fetch new data and cancel old
  useEffect(() => {
    fetchData(query);
  }, [query]);

  return (
    <div style={{ padding: "50px" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search title..."
        style={{ padding: "10px", width: "300px" }}
      />

      {loading && <p>Loading...</p>}

      <div>
        {data.map((item: DataInt) => (
          <div
            key={item.id}
            style={{
              padding: "10px",
              marginTop: "10px",
              border: "1px solid #ddd",
            }}
          >
            {item.id} — {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchWithAbort;
