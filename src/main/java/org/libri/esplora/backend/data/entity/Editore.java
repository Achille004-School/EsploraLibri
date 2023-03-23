package org.libri.esplora.backend.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "Editore")
public class Editore {
    @Id
    @NotNull
    @GeneratedValue
    @Column(nullable = false, name = "ID", unique = true)
    private Long id;

    @NotNull
    @Column(nullable = false, length = 128, name = "Nome")
    private String nome;
}
