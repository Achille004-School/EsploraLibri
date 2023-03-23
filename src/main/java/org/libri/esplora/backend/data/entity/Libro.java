package org.libri.esplora.backend.data.entity;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "Libro")
public class Libro  {
    @Id
    @NotNull
    @Column(nullable = false, length = 13, name = "Isbn13", unique = true)
    @OneToMany
    private String isbn13;

    @NotNull
    @Column(nullable = false, length = 128, name = "Titolo")
    private String titolo;

    @NotNull
    @Column(nullable = false, name = "Prezzo")
    private Float prezzo;

    @NotNull
    @Column(nullable = false, name = "Pagine")
    private Short pagine;

    @NotNull
    @Column(nullable = false, length = 1024, name = "Descrizione")
    private String descrizione;

    @NotNull
    @Column(nullable = false, name = "Edizione")
    private Byte edizione;

    @NotNull
    @Column(nullable = false, name = "AnnoEdizione")
    private Year annoEdizione;

    @Column(name = "Volume")
    private Short volume;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "Voto", orphanRemoval = true)
    @JoinColumn(name= "Libro")
    private List<Voto> voti = new ArrayList<Voto>();
}
