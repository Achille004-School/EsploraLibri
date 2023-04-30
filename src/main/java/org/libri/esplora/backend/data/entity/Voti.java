package org.libri.esplora.backend.data.entity;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@Table(name = "Voti")
public class Voti extends EntitaAstratta {
    @NotNull
    @Column(nullable = false, name = "valutazione")
    private Byte valutazione;

    @NotNull
    @Column(nullable = false, name = "data_ora")
    private LocalDateTime dataOra;

    // Associazioni

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="libro", referencedColumnName="ID")
    private Libri libro;
}