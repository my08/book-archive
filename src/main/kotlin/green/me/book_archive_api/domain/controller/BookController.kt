package green.me.book_archive_api.domain.controller
import green.me.book_archive_api.domain.entity.BookRecord
import green.me.book_archive_api.domain.repository.BookRecordRepository
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
@RequestMapping("/api/books")
class BookController(
    private val bookRepository: BookRecordRepository
) {
    @GetMapping
    fun getAllBooks(): List<BookRecord> {
        return bookRepository.findAll()
    }
}