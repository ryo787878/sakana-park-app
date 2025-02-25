"use client"; // クライアントコンポーネント

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // エラー文をリセット

    try {
      // Firebase Authentication でログイン
      await signInWithEmailAndPassword(auth, email, password);

      // ログイン成功 → ダッシュボードへ遷移
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message ?? "ログインエラーが発生しました");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>管理者ログイン</h1>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", marginTop: "1rem" }}>
        <div>
          <label>メールアドレス:</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ marginTop: "1rem" }}>
          ログイン
        </button>
      </form>
    </div>
  );
}