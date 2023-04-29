package org.libri.esplora.backend.data.service;

import java.util.Optional;

import org.libri.esplora.backend.data.entity.Libri;
import org.libri.esplora.backend.data.repository.RepositoryLibri;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ServizioLibri {
    private final RepositoryLibri repository;

    @Autowired
    public ServizioLibri(RepositoryLibri repository) {
        this.repository = repository;
    }

    public Libri saveOrUpdate(Libri entity) {
        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Long count() {
        return repository.count();
    }

    // Find methods

    public Optional<Libri> findById(Long id) {
        return repository.findById(id);
    }

    public Iterable<Libri> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
