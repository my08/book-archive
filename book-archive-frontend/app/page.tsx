'use client';

import { useEffect, useState } from 'react';
// 1. 등록 페이지로 이동하기 위한 Link 컴포넌트 추가
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  rating: number;
  bgImgUrl?: string;
  coverImgUrl?: string;
}

export default function BookArchivePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:8080/api/books';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('데이터를 불러오는데 실패했습니다.');
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('정말 이 책을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('서버에서 삭제 처리에 실패했습니다.');
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err: any) {
      console.error('Delete Error:', err);
      alert(err.message || '삭제 중 에러가 발생했습니다.');
    }
  };

  if (error) return <div className="p-8 text-center text-red-500">에러: {error}</div>;

  return (
    <main className="min-h-screen bg-white">
      {/* 2. 상단 헤더 영역에 미니멀한 ADD NEW BOOK 버튼 추가 */}
      <header className="max-w-5xl mx-auto px-6 pt-12 flex justify-between items-end border-b border-black/5 pb-4">
        <h1 className="text-xl font-bold tracking-widest text-[#1a1a1a]">BOOK ARCHIVE</h1>
        <Link 
          href="/write" 
          className="text-xs font-black tracking-widest text-gray-900 border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-300"
        >
          ADD NEW BOOK +
        </Link>
      </header>

      <section className="px-6 pb-24 max-w-5xl mx-auto pt-8">
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
                  <img 
                    src={book.bgImgUrl || "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a"} 
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                    alt="bg"
                  />
                  
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
  
                  <div className="absolute inset-0 flex items-center justify-center p-14">
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
                    
                    <div className="flex justify-between items-center mt-2 border-t border-black/5 pt-2">
                      <div className="flex text-[10px] text-gray-800 tracking-[0.3em]">
                        {"★".repeat(book.rating || 0)}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] font-black tracking-widest text-gray-400 cursor-pointer hover:text-black transition-colors">
                          DETAIL
                        </span>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="text-[9px] font-black tracking-widest text-red-500 hover:text-red-700 transition-colors"
                        >
                          DELETE
                        </button>
                      </div>
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