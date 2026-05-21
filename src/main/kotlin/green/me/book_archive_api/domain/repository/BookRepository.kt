package green.me.book_archive_api.domain.repository

import green.me.book_archive_api.domain.entity.Book
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BookRepository : JpaRepository<Book, Long> {
    fun findBooksByUserId(userId: Long): List<Book>
}