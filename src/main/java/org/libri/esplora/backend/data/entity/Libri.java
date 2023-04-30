package org.libri.esplora.backend.data.entity;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@Table(name = "Libri")
public class Libri extends EntitaAstratta {
    @NotNull
    @Column(nullable = false, length = 13, name = "ean", unique = true)
    private String ean;

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
    @Column(nullable = false, length = 8192, name = "descrizione")
    private String descrizione;

    @NotNull
    @Column(nullable = false, name = "anno_edizione")
    private Year annoEdizione;

    @Column(nullable = true, name = "volume")
    private Short volume;

    @NotNull
    @Column(nullable = false, length = 2048, name = "link")
    private String link;

    // Associazioni
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "libro", orphanRemoval = true)
    private List<Voti> voti = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="autore", referencedColumnName="ID")
    private Autori autore;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="editore", referencedColumnName="ID")
    private Editori editore;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="genere", referencedColumnName="ID")
    private Generi genere;

    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="lingua", referencedColumnName="ID")
    private Lingue lingua;
}