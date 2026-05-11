"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5); //기본5점

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`제목: ${title}\n내용: ${content}\n\n내일 서버로 보낼 예정입니다!`);
    router.push("/"); // 저장 후 홈으로 이동
  };

  return (
    <main className="min-h-screen bg-white font-sans p-10 max-w-2xl mx-auto">
      <header className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-outfit font-bold tracking-tighter uppercase">New Record</h1>
        <button onClick={() => router.back()} className="text-sm opacity-40 hover:opacity-100 uppercase font-bold">Close</button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="group">
          <label className="block text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase mb-2">Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors text-xl font-outfit"
            placeholder="어떤 책을 기록할까요?"
            required
          />
        </div>

        {/* 별점 입력창 추가 */}
        <div className="group">
          <label className="block text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase mb-2">Rating</label>
          <div className="flex gap-2 text-2xl cursor-pointer select-none">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                onClick={() => setRating(star)} 
                className={`transition-colors ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        <div className="group">
          <label className="block text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase mb-2">Content</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors resize-none leading-relaxed"
            placeholder="인상 깊었던 문장을 남겨보세요."
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-black text-white font-outfit font-bold text-sm tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors"
        >
          Save Record
        </button>
      </form>
    </main>
  );
}