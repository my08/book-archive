package green.me.book_archive_api.domain.entity

data class BookCreateRequest (
    val title : String,
    val content: String,
    val rating:Int
)