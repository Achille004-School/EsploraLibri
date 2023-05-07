package org.libri.esplora.backend.data.service;

import java.time.Year;

import lombok.Data;

@Data
public class RisultatoRicerca {
    private final Long idLibro;
    private final String ean;
    private final String titolo;
    private final Float prezzo;
    private final Short pagine;
    private final String descrizione;
    private final Year annoEdizione;
    private final Short volume;
    private final String link;
    private final String autore;
    private final String editore;
    private final String genere;
    private final String lingua;
    private final String codLingua;
    private final Double valutazioneMedia;
}