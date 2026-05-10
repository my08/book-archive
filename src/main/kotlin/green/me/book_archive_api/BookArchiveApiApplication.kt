package green.me.book_archive_api

import green.me.book_archive_api.domain.entity.BookRecord
import green.me.book_archive_api.domain.repository.BookRecordRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class BookArchiveApiApplication{
	// 서버가 뜰 때 실행될 초기화 로직
	@Bean
	fun initData(repository: BookRecordRepository) = CommandLineRunner {
		// DB에 데이터가 하나도 없을 때만 샘플을 넣습니다.
		if (repository.count() == 0L) {
			repository.save(
				BookRecord(
					title = "불편한 편의점",
					content = "첫 번째 구절...",
					rating = 5,
					bgImgUrl = "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a",
					coverImgUrl = "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
				)
			)
			repository.save(
				BookRecord(
					title = "역행자",
					content = "두 번째 구절...",
					rating = 4,
					bgImgUrl = "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
					coverImgUrl = "https://images.unsplash.com/photo-1589829085413-56de8ae18c73"
				)
			)
			repository.save(
				BookRecord(
					title = "클린 코드",
					content = "세 번째 구절...",
					rating = 5,
					bgImgUrl = "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
					coverImgUrl = "https://images.unsplash.com/photo-1532012197267-da84d127e765"
				)
			)
			println("✅ 샘플 데이터 3개가 등록되었습니다.")
		}
	}
}

fun main(args: Array<String>) {
	runApplication<BookArchiveApiApplication>(*args)
}
