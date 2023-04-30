package org.libri.esplora.backend.data.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@Table(name = "Editori")
public class Editori extends EntitaAstratta {
    @NotNull
    @Column(nullable = false, length = 128, name = "nome")
    private String nome;

    // Associazioni
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "editore", orphanRemoval = true)
    private List<Libri> libri = new ArrayList<>();
}