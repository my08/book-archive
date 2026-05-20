package green.me.book_archive_api.domain.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "books")
class Book (

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long ?=null,

    @Column(nullable = false)
    val title: String,

    @Column(columnDefinition = "TEXT")
    val content: String,

    @Column(nullable = false)
    val rating: Int,

    @Column
    val createAt: LocalDateTime = LocalDateTime.now(),

    ){}