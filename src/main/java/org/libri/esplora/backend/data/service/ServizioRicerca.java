package org.libri.esplora.backend.data.service;

import java.time.Year;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.libri.esplora.backend.data.repository.RepositoryLibri;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServizioRicerca {
    private final RepositoryLibri repository;

    @Autowired
    public ServizioRicerca(RepositoryLibri repository) {
        this.repository = repository;
    }

    // Tempi ms
    // Vecchio modo (ricerca risultati diretta): Medio = 408.47, Mediano = 400.34
    // Nuovo modo (singola ricercaId con lista): Medio = 329.93, Mediano = 305.69
    // Modo sperimentale (multiple ricercaId)  : Medio = 525.70, Mediano = 521.99
    public List<RisultatoRicerca> ricerca(String valoreRicerca, Year annoMin, Year annoMax, Float prezzoMin, Float prezzoMax, Short pagineMin, Short pagineMax, Double valutazioneMin, String genere, String lingua, Integer maxRisultati) {
        List<Long> idLibri = repository.ricerca(valoreRicerca, annoMin, annoMax, prezzoMin, prezzoMax, pagineMin, pagineMax, valutazioneMin, genere, lingua, maxRisultati);
        List<RisultatoRicerca> risultati = repository.ricercaId(idLibri.toArray(new Long[idLibri.size()]));
        Collections.sort(risultati, Comparator.comparingLong(risultato -> idLibri.indexOf(risultato.getIdLibro())));

        return risultati;
    }

    public Optional<RisultatoRicerca> ricercaId(Long... id) {
        List<RisultatoRicerca> risultati = repository.ricercaId(id);
        if(risultati.size() > 0) {
            return Optional.of(risultati.get(0));
        } else {
            return Optional.empty();
        }
    }

    public Double prezzoMedio() {
        return repository.prezzoMedio();
    }
}