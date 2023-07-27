package hanglog.trip.domain;

import static hanglog.global.type.StatusType.USABLE;
import static jakarta.persistence.CascadeType.MERGE;
import static jakarta.persistence.CascadeType.PERSIST;
import static jakarta.persistence.CascadeType.REMOVE;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import hanglog.global.BaseEntity;
import hanglog.global.type.StatusType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@SQLDelete(sql = "UPDATE trip SET status = 'DELETED' WHERE id = ?")
@Where(clause = "status = 'USABLE'")
public class Trip extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(nullable = false)
    @ColumnDefault("https://github.com/woowacourse-teams/2023-hang-log/assets/64852591/65607364-3bf7-4920-abd1-edfdbc8d4df0")
    private String imageUrl;
    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    @ColumnDefault("''")
    private String description;

    @OneToMany(mappedBy = "trip", cascade = {PERSIST, REMOVE, MERGE}, orphanRemoval = true)
    private List<DayLog> dayLogs = new ArrayList<>();

    private Trip(
            final Long id,
            final String title,
            final LocalDate startDate,
            final LocalDate endDate,
            final String description,
            final StatusType status
    ) {
        super(status);
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }

    public Trip(
            final Long id,
            final String title,
            final LocalDate startDate,
            final LocalDate endDate,
            final String description
    ) {
        this(id, title, startDate, endDate, description, USABLE);
    }

    public Trip(
            final Long id,
            final String title,
            final String imageUrl,
            final LocalDate startDate,
            final LocalDate endDate,
            final String description,
            final List<DayLog> dayLogs
    ) {
        super(USABLE);
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.dayLogs = dayLogs;
    }

    public Trip(
            final String title,
            final LocalDate startDate,
            final LocalDate endDate,
            final String description
    ) {
        this(null, title, startDate, endDate, description);
    }

    public Trip(final String title, final LocalDate startDate, final LocalDate endDate
    ) {
        this(title, startDate, endDate, "");
    }
}
