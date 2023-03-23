package org.libri.esplora.backend.data.entity;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @Column(nullable = false, length = 13, name = "isbn13", unique = true)
    private String isbn13;

    @NotNull
    @Column(nullable = false, length = 128, name = "titolo")
    private String titolo;

    @NotNull
    @Column(nullable = false, name = "prezzo")
    private Float prezzo;

    @NotNull
    @Column(nullable = false, name = "pagine")
    private Short pagine;

    @NotNull
    @Column(nullable = false, length = 1024, name = "descrizione")
    private String descrizione;

    @NotNull
    @Column(nullable = false, name = "edizione")
    private Byte edizione;

    @NotNull
    @Column(nullable = false, name = "anno_edizione")
    private Year annoEdizione;

    @Column(name = "volume")
    private Short volume;

    // Associazioni
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "libro", orphanRemoval = true)
    private List<Voto> voti = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="autore", referencedColumnName="ID")
    private Autore autore;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="editore", referencedColumnName="ID")
    private Editore editore;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="lingua", referencedColumnName="cod_lingua")
    private Lingua lingua;
}
