package green.me.book_archive_api.domain.entity

import jakarta.persistence.*
import java.time.LocalDateTime
@Entity
@Table(name="book_record")
class BookRecord (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    // 모든 필드 뒤에 = "" 또는 = 0 등을 붙여서 초기값을 줍니다.
    var title: String = "",

    @Column(columnDefinition = "TEXT")
    var content: String = "",

    var rating: Int = 0,

    var coverImgUrl: String? = null, // nullable(?) 필드는 null로 초기화 가능

    var bgImgUrl: String? = null,

    val createdAt: LocalDateTime = LocalDateTime.now()
)