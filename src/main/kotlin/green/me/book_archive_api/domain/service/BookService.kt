package green.me.book_archive_api.domain.service

import green.me.book_archive_api.domain.entity.Book
import green.me.book_archive_api.domain.entity.BookCreateRequest
import green.me.book_archive_api.domain.entity.BookRecord
import green.me.book_archive_api.domain.repository.BookRecordRepository
import green.me.book_archive_api.domain.repository.BookRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class BookService (private val bookRepository: BookRepository) {

    @Transactional(readOnly = true)
    fun getAllBooks(): List<Book> {
        return bookRepository.findAll()
    }
    @Transactional
    fun saveBook(request: BookCreateRequest): Book {
        val book = Book(
            title = request.title,
            content = request.content,
            rating = request.rating
        )
        return bookRepository.save(book)
    }

    @Transactional
    fun deleteBook(id: Long) {
        bookRepository.deleteById(id);
    }
}