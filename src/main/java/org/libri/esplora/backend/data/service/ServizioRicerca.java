package org.libri.esplora.backend.data.service;

import java.time.Year;
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

    public List<RisultatoRicerca> ricerca(String valoreRicerca, Year annoMin, Year annoMax, Float prezzoMin, Float prezzoMax, Short pagineMin, Short pagineMax, Double valutazioneMin, String genere, String lingua) {
        return repository.ricerca(valoreRicerca, annoMin, annoMax, prezzoMin, prezzoMax, pagineMin, pagineMax, valutazioneMin, genere, lingua);
    }

    public Optional<RisultatoRicerca> ricercaId(Long id) {
        return repository.ricercaId(id);
    }
}