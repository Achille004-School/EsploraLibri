package org.libri.esplora.backend.data.service;

import java.time.Year;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class RisultatoRicerca {
    @JsonCreator
    public RisultatoRicerca(@JsonProperty("idLibro") Long idLibro,
            @JsonProperty("ean") String ean,
            @JsonProperty("titolo") String titolo,
            @JsonProperty("prezzo") Float prezzo,
            @JsonProperty("pagine") Short pagine,
            @JsonProperty("descrizione") String descrizione,
            @JsonProperty("annoEdizione") Year annoEdizione,
            @JsonProperty("volume") Short volume,
            @JsonProperty("link") String link,
            @JsonProperty("autore") String autore,
            @JsonProperty("editore") String editore,
            @JsonProperty("genere") String genere,
            @JsonProperty("lingua") String lingua,
            @JsonProperty("codLingua") String codLingua,
            @JsonProperty("valutazioneMedia") Double valutazioneMedia) {
        this.idLibro = idLibro;
        this.ean = ean;
        this.titolo = titolo;
        this.prezzo = prezzo;
        this.pagine = pagine;
        this.descrizione = descrizione;
        this.annoEdizione = annoEdizione;
        this.volume = volume;
        this.link = link;
        this.autore = autore;
        this.editore = editore;
        this.genere = genere;
        this.lingua = lingua;
        this.codLingua = codLingua;
        this.valutazioneMedia = valutazioneMedia;
    }

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