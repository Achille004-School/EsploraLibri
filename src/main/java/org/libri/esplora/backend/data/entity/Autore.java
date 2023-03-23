package org.libri.esplora.backend.data.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "Autore")
public class Autore {
    @Id
    @NotNull
    @GeneratedValue
    @Column(nullable = false, name = "ID", unique = true)
    private Long id;

    @NotNull
    @Column(nullable = false, length = 128, name = "nome")
    private String nome;

    @NotNull
    @Column(nullable = false, length = 128, name = "cognome")
    private String cognome;

    @NotNull
    @Column(length = 3, name = "titolo")
    private String nazionalità;

    // Associazioni
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "autore", orphanRemoval = true)
    private List<Libro> libri = new ArrayList<>();
}
