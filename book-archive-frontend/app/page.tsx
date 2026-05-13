"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  content: string; // 백엔드에서 추가된 필드
  rating: number;
  // 아직 DB에 없는 필드들은 선택적(Optional)으로 처리해 에러를 방지합니다.
  coverImgUrl?: string | null; 
  bgImgUrl?: string | null;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💡 12년 차의 팁: 개발 환경에서는 캐시 때문에 데이터가 안 보일 수 있으니 
    // { cache: 'no-store' }를 추가하거나 주소 뒤에 타임스탬프를 붙이기도 합니다.
    fetch("http://localhost:8080/api/books", { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
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
    <main className="min-h-screen bg-[#ffffff] font-sans text-[#1f1f1f]">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {books.length === 0 ? (
                <div className="col-span-full text-center py-20 text-gray-300 tracking-widest text-xs">
                    NO RECORDS FOUND. PLEASE ADD A NEW BOOK.
                </div>
            ) : (
                books.map((book) => (
                    <div 
                      key={book.id} 
                      className="group relative w-full aspect-[3/4] overflow-hidden bg-[#f2f2f2] transition-all duration-500"
                    >
                      {/* 배경 이미지: DB에 없을 경우를 대비해 기존 fallback URL 유지 */}
                      <img 
                        src={book.bgImgUrl || "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a"} 
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.8] grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                        alt="bg"
                      />
                      
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
      
                      <div className="absolute inset-0 flex items-center justify-center p-14">
                        {/* 커버 이미지: DB에 없을 경우를 대비해 기존 fallback URL 유지 */}
                        <img 
                          src={book.coverImgUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"} 
                          className="w-auto h-full max-h-[75%] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:scale-105" 
                          alt="cover"
                        />
                      </div>
      
                      <div className="absolute inset-x-0 bottom-0 p-6 bg-white/80 backdrop-blur-md translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h3 className="text-[#1a1a1a] font-outfit font-bold text-base tracking-tight uppercase truncate">
                          {book.title}
                        </h3>
                        {/* content도 필요한 경우 여기에 노출할 수 있습니다 */}
                        <div className="flex justify-between items-center mt-2 border-t border-black/5 pt-2">
                          <div className="flex text-[10px] text-gray-800 tracking-[0.3em]">
                            {"★".repeat(book.rating)}
                          </div>
                          <span className="text-[9px] font-black tracking-widest text-gray-400">DETAIL</span>
                        </div>
                      </div>
                    </div>
                  ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}