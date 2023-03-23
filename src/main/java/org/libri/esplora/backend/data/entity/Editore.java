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
@Table(name = "Editore")
public class Editore {
    @Id
    @NotNull
    @GeneratedValue
    @Column(nullable = false, name = "ID", unique = true)
    private Long id;

    @NotNull
    @Column(nullable = false, length = 128, name = "nome")
    private String nome;

    // Associazioni
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "editore", orphanRemoval = true)
    private List<Libro> libri = new ArrayList<>();
}
