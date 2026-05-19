package green.me.book_archive_api.domain.controller
import green.me.book_archive_api.domain.entity.Book
import green.me.book_archive_api.domain.entity.BookCreateRequest
import green.me.book_archive_api.domain.entity.BookRecord
import green.me.book_archive_api.domain.repository.BookRecordRepository
import green.me.book_archive_api.domain.service.BookService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
@RequestMapping("/api/books")
class BookController(private val bookService: BookService){
    @GetMapping(produces = ["application/json;charset=UTF-8"])
    fun getAllBooks(): List<Book> {
        return bookService.getAllBooks()
    }

    @PostMapping(produces = ["application/json;charset=UTF-8"])
    fun createBook(@RequestBody request: BookCreateRequest): Book {
        return bookService.saveBook(request)
    }

    @DeleteMapping("/{id}")
    fun deleteBook(@PathVariable (name="id")id: Long) : ResponseEntity<Unit> {
        bookService.deleteBook(id);

        return ResponseEntity.noContent().build();

    }

}