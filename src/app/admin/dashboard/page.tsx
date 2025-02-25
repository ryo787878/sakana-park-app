// app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // お知らせ投稿用フォームの状態
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleAnnouncementSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const announcement = {
        title,
        content,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "announcements"), announcement);
      setSuccess("お知らせが投稿されました！");
      setTitle("");
      setContent("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "お知らせの投稿に失敗しました");
      } else {
        setError("お知らせの投稿に失敗しました");
      }
    }
  };

  if (loading) {
    return <p>読込中...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>管理ダッシュボード</h1>
      {user && <p>こんにちは、{user.email} さん</p>}

      <section style={{ marginTop: "2rem" }}>
        <h2>お知らせ投稿</h2>
        <form onSubmit={handleAnnouncementSubmit}>
          <div>
            <label>タイトル:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
              required
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label>内容:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ marginLeft: "0.5rem", width: "100%", height: "100px" }}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <button type="submit" style={{ marginTop: "1rem" }}>
            投稿
          </button>
        </form>
      </section>
    </div>
  );
}