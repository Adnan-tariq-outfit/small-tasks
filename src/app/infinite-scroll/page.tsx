"use client";
import { useEffect, useState, useRef } from "react";

export default function InfiniteScrollExample() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // cancel second request when first request in progress
  const isFetching = useRef(false);

  // Load API data
  const loadData = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    const limit = 10; // load 10 items each time
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${
        page * limit
      }&_limit=${limit}`
    );

    const result = await res.json();

    setData((prev): any => [...prev, ...result]);

    // If returned data is smaller than limit → no more data
    if (result.length < limit) {
      setHasMore(false);
    }

    isFetching.current = false;
  };

  useEffect(() => {
    loadData();
  }, [page]);

  // IntersectionObserver
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  interface dataInterface {
    id: string;
    title: string;
  }

  return (
    <div>
      {data.map((item: dataInterface) => (
        <div style={{ paddingTop: "100px" }} key={item.id} className="card">
          {item.id} - {item.title}
        </div>
      ))}

      {/* Loader / Sentinel */}
      {hasMore && (
        <div
          ref={loaderRef}
          style={{ height: "40px", background: "#eee", marginTop: 20 }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}
