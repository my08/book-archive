"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  content: string;
  rating: number;
  coverImgUrl: string | null;
  bgImgUrl: string | null;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 로딩 실패:", err);
        setLoading(false);
      });
  }, []);

  return (
    /* 전체적인 톤은 화이트&그레이로 유지 */
    <main className="min-h-screen bg-[#ffffff] font-sans text-[#1f1f1f]">
      
      {/* 네비게이션: 직각형 레이아웃에 맞춰 정갈하게 배치 */}
      <nav className="flex justify-between items-center py-12 px-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-outfit font-semibold tracking-tighter text-[#1a1a1a] uppercase">
          My Archive
        </h1>
        <div className="space-x-10 text-xs font-bold tracking-[0.2em] opacity-40">
          <Link href="/write">
            <button className="hover:opacity-100 transition-opacity">WRITE</button>
          </Link>
          <button className="hover:opacity-100 transition-opacity">SEARCH</button>
        </div>
      </nav>

      <section className="px-6 pb-24 max-w-5xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-800 animate-spin"></div>
          </div>
        ) : (
          /* gap-2로 더 밀착시켜서 그리드 느낌을 강조했습니다 */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {books.map((book) => (
              <div 
                key={book.id} 
                className="group relative w-full aspect-[3/4] overflow-hidden bg-[#f2f2f2] transition-all duration-500"
              >
                {/* 배경 이미지: rounded 속성 제거 */}
                <img 
                  src={book.bgImgUrl || "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a"} 
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.8] grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                  alt="bg"
                />
                
                {/* 오버레이 필터 */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

                {/* 중앙 도서 커버: 여기도 직각형으로 유지 */}
                <div className="absolute inset-0 flex items-center justify-center p-14">
                  <img 
                    src={book.coverImgUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"} 
                    className="w-auto h-full max-h-[75%] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:scale-105" 
                    alt="cover"
                  />
                </div>

                {/* 하단 텍스트 정보: 블러 효과와 직각 레이아웃 */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-white/80 backdrop-blur-md translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-[#1a1a1a] font-outfit font-bold text-base tracking-tight uppercase truncate">
                    {book.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2 border-t border-black/5 pt-2">
                    <div className="flex text-[10px] text-gray-800 tracking-[0.3em]">
                      {"★".repeat(book.rating)}
                    </div>
                    <span className="text-[9px] font-black tracking-widest text-gray-400">DETAIL</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}