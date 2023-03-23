package org.libri.esplora.backend.data.entity;

import com.vaadin.flow.component.template.Id;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
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
    @Column(nullable = false, length = 128, name = "Nome")
    private String nome;

    @NotNull
    @Column(nullable = false, length = 128, name = "Cognome")
    private String cognome;

    @NotNull
    @Column(length = 3, name = "Titolo")
    private String nazionalità;
}
