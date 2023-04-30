package org.libri.esplora.backend.data.service;

public interface RisultatoRicerca {
    Long getIdLibro();
    String getEan();
    String getTitolo();
    Float getPrezzo();
    Short getPagine();
    String getDescrizione();
    Integer getAnnoEdizione();
    Short getVolume();
    String getLink();
    String getAutore();
    String getEditore();
    String getGenere();
    String getLingua();
    String getCodLingua();
    Float getValutazioneMedia();
}