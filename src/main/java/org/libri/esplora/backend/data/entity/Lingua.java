package org.libri.esplora.backend.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "Lingua")
public class Lingua {
    @Id
    @NotNull
    @Column(nullable = false, name = "CodLingua", unique = true)
    private String CODLingua;

    @NotNull
    @Column(nullable = false, length = 128, name = "Nome")
    private String nome;
}
