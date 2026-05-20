'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  rating: number;
  createdAt: string; 
  bgImgUrl?: string;
  coverImgUrl?: string;
}

export default function BookArchivePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [monthlyData, setMonthlyData] = useState<number[]>(Array(12).fill(0));

  const API_URL = 'http://localhost:8080/api/books';

  const getMonthFromDate = (dateString: string): number => {
    if (!dateString) return 1;
    const date = new Date(dateString);
    return date.getMonth() + 1;
  };

  const calculateMonthlyStats = (bookList: Book[]) => {
    const monthlyCounts = Array(12).fill(0);
    bookList.forEach((book) => {
      const month = getMonthFromDate(book.createdAt);
      if (month >= 1 && month <= 12) {
        monthlyCounts[month - 1]++;
      }
    });
    return monthlyCounts;
  };

  useEffect(() => {
    //setLoading(true);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('데이터를 불러오는데 실패했습니다.');
        return res.json();
      })
      .then((data) => {
        const stats = calculateMonthlyStats(data);
        setMonthlyData(stats);
        setBooks(data);
        setLoading(false);

        console.log("📊 먀먀님의 올해 아카이브 정산 완료! 📊");
        console.log(`[5월 등록 수]: ${stats[4]}개`);
        console.log("전체 월별 데이터 리스트(1월~12월):", stats);
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

      setBooks((prevBooks) => {
        const updated = prevBooks.filter((book) => book.id !== id);
        setMonthlyData(calculateMonthlyStats(updated));
        return updated;
      });

    } catch (err: unknown) {
      console.error('Delete Error:', err);
  
  // 💡 err가 에러 객체(Error)인지 확인하고 메시지를 뽑아내는 정석 코드
    const errorMessage = err instanceof Error ? err.message : '삭제 중 에러가 발생했습니다.';
    alert(errorMessage);
    }
  };

  if (error) return <div className="p-8 text-center text-red-500">에러: {error}</div>;

  return (
    
    <main className="min-h-screen bg-white">
      <header className="max-w-5xl mx-auto px-6 pt-12 flex justify-between items-end border-b border-black/5 pb-4">
        <h1 className="text-xl font-bold tracking-widest text-[#1a1a1a]">BOOK ARCHIVE</h1>
        <Link 
          href="/write" 
          className="text-xs font-black tracking-widest text-gray-900 border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-300"
        >
          ADD NEW BOOK +
        </Link>
      </header>

      {/* 📊 여기서부터 추가: 귀여운 월별 정산 현황판 📊 */}
      <section className="max-w-5xl mx-auto px-6 pt-8">
        <div className="bg-[#f9f9f9] border border-black/5 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📊</span>
            <h2 className="text-sm font-black tracking-wider text-gray-800">2026 MYAMYA'S WRAPPED (월별 정산)</h2>
          </div>
          
          {/* 12달 그래프를 가로로 이쁘게 정렬 */}
          <div className="grid grid-cols-12 gap-2 pt-4 items-end h-32 border-b border-black/10">
            {monthlyData.map((count, index) => (
              <div key={index} className="flex flex-col items-center group relative pt-16">
                
                {/* 📚 마우스 오버 시 둥둥 떠다니는 책 아이콘 레이어 */}
                {/* 12달 그래프의 monthlyData.map 내부에서 책 아이콘 레이어 부분만 통째로 교체! */}
                {count > 0 && (
                  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 hidden group-hover:flex gap-2 items-center justify-center pointer-events-none z-10 h-16 w-40">
                    
                    {/* 💡 린터 에러 방지용 리액트 스타일 태그를 내부에 격리시켜 안전하게 주입! */}
                    <style dangerouslySetInnerHTML={{ __html: `
                      @keyframes hpFloat {
                        0% { transform: translateY(0px) rotate(0deg) translateX(0px); }
                        33% { transform: translateY(-8px) rotate(4deg) translateX(2px); }
                        66% { transform: translateY(-3px) rotate(-3deg) translateX(-2px); }
                        100% { transform: translateY(0px) rotate(0deg) translateX(0px); }
                      }
                      .magic-book-fly {
                        display: inline-block !important; /* 💡 애니메이션이 먹히려면 block 성질이 절대적으로 필요합니다! */
                      }
                    `}} />

                    {Array(count).fill(0).map((_, i) => {
                      // 책마다 유일한 속도와 엇박자 타이밍을 난수로 생성
                      const duration = 2.5 + (i * 0.7) % 2; // 2.5초, 3.2초 등 책마다 주기가 완전히 엇갈림
                      const delay = (i * -0.6) % 3; // 마우스 올리자마자 이미 공중비행 중인 것처럼 마이너스 딜레이

                      return (
                        <span 
                          key={i} 
                          className="text-3xl magic-book-fly"
                          style={{ 
                            animation: `hpFloat ${duration}s ease-in-out ${delay}s infinite`,
                            // 살짝 흐트러져서 배치되도록 랜덤 효과 추가
                            transformOrigin: 'center bottom',
                          }}
                        >
                          📚
                        </span>
                      );
                    })}
                  </div>
                )}
                {/* 마우스 올리면 뜨는 툴팁 */}
                <div className="absolute -top-6 scale-0 group-hover:scale-100 bg-black text-white text-[10px] font-bold px-2 py-1 rounded transition-all duration-200 z-20">
                  {count}권
                </div>

                {/* 📊 실시간 막대 그래프 */}
                <div 
                  style={{ height: `${Math.max(count * 15, 8)}px` }}
                  className={`w-full rounded-t-md transition-all duration-1000 ease-out delay-100 ${
                    count > 0 
                      ? 'bg-black opacity-80 group-hover:opacity-100' 
                      : 'bg-gray-200'
                  }`}
                />
                
                {/* 하단 월 표시 */}
                <span className="text-[10px] font-bold text-gray-400 mt-2">
                  {index + 1}월
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

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