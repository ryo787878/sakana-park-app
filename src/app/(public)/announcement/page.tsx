// app/announcement/page.tsx
"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

type Announcement = {
  id: string;
  title: string;
  content: string;
  createdAt?: any;
};

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const q = query(
          collection(db, "announcements"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data: Announcement[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Announcement[];
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return <p>読込中...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>お知らせ</h1>
      {announcements.length === 0 && <p>現在、お知らせはありません。</p>}
      {announcements.map((ann) => (
        <div
          key={ann.id}
          style={{
            marginBottom: "1.5rem",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <h2>{ann.title}</h2>
          <p>{ann.content}</p>
          {ann.createdAt && (
            <small>
              {ann.createdAt.toDate().toLocaleString()}
            </small>
          )}
        </div>
      ))}
    </div>
  );
}