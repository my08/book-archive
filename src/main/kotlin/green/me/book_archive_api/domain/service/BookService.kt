package green.me.book_archive_api.domain.service

import green.me.book_archive_api.domain.entity.Book
import green.me.book_archive_api.domain.entity.BookCreateRequest
import green.me.book_archive_api.domain.entity.BookRecord
import green.me.book_archive_api.domain.repository.BookRecordRepository
import green.me.book_archive_api.domain.repository.BookRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class BookService (private val bookRepository: BookRepository) {

    //1. 전체 조회
    @Transactional(readOnly = true)
    fun getAllBooks(): List<Book> {
        return bookRepository.findAll()
    }

    //2. 책 저장
    @Transactional
    fun saveBook(request: BookCreateRequest): Book {
        val book = request.toEntity();
        return bookRepository.save(book)
    }

    @Transactional
    fun deleteBook(id: Long) {
        val book = bookRepository.findByIdOrNull(id)
            ?: throw IllegalArgumentException("Book does not exist. ID: $id")
        bookRepository.deleteById(id);
    }
    @Transactional
    fun findBooksByUserId(userId: Long): List<Book> {
        return bookRepository.findBooksByUserId(userId)
    }

    fun findBookById(id: Long) : Book{
        return bookRepository.findByIdOrNull(id)
            ?:  throw IllegalArgumentException("Book does not exist. ID: $id")
    }
}