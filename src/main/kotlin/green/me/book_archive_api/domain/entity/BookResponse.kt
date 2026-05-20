package green.me.book_archive_api.domain.entity

import java.time.LocalDateTime

data class BookResponse(

    val id: Long,
    val title : String,
    val content : String,
    var rating : Int,
    var createAt: LocalDateTime,
)
