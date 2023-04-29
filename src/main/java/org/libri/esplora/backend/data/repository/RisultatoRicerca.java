package org.libri.esplora.backend.data.repository;

import java.time.Year;

import lombok.Data;

@Data
public class RisultatoRicerca {
    private Long IDLibro;
    private String isbn13;
    private String titolo;
    private Float prezzo;
    private Short pagine;
    private String descrizione;
    private Byte edizione;
    private Year annoEdizione;
    private Short volume;
    private String autore;
    private String editore;
    private String genere;
    private String lingua;
    private String codLingua;
    private Float valutazioneMedia;
}
