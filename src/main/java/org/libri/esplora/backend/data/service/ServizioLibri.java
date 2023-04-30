package org.libri.esplora.backend.data.service;

import java.util.List;
import java.util.Optional;

import org.libri.esplora.backend.data.entity.Libri;
import org.libri.esplora.backend.data.repository.RepositoryLibri;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServizioLibri {
    private final RepositoryLibri repository;

    @Autowired
    public ServizioLibri(RepositoryLibri repository) {
        this.repository = repository;
    }

    public Libri salvaOAggiorna(Libri entity) {
        return repository.save(entity);
    }

    public void elimina(Long id) {
        repository.deleteById(id);
    }

    public Long numRighe() {
        return repository.count();
    }

    // Find methods

    public Optional<Libri> trovaPerId(Long id) {
        return repository.findById(id);
    }

    public List<Libri> trovaTutti() {
        return repository.findAll();
    }
}