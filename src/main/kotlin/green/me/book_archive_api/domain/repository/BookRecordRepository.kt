package green.me.book_archive_api.domain.repository

import green.me.book_archive_api.domain.entity.BookRecord
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BookRecordRepository : JpaRepository<BookRecord, Long> {
    // 기본적인 save, findAll, findById 등은 이미 포함되어 있습니다.
    // 나중에 제목 검색 기능이 필요하면 여기에 함수 한 줄만 추가하면 됩니다.
}