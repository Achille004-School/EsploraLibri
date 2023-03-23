package org.libri.esplora.backend.data.entity;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "Voto")
public class Voto {
    @Id
    @NotNull
    @GeneratedValue
    @Column(nullable = false, name = "ID", unique = true)
    private Long id;

    @NotNull
    @Column(nullable = false, name = "valutazione")
    private Byte valutazione;

    @NotNull
    @Column(nullable = false, name = "data_ora")
    private LocalDateTime dataOra;

    // Associazioni

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="libro", referencedColumnName="isbn13")
    private Libro libro;
}
