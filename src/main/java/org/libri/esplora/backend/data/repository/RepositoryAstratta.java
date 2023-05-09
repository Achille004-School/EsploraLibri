package org.libri.esplora.backend.data.repository;

import org.libri.esplora.backend.data.entity.EntitaAstratta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryAstratta<T extends EntitaAstratta> extends JpaRepository<T, Long> {}
