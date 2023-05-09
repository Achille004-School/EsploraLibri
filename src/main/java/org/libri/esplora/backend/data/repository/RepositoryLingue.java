package org.libri.esplora.backend.data.repository;

import java.util.List;

import org.libri.esplora.backend.data.entity.Lingue;

public interface RepositoryLingue extends RepositoryAstratta<Lingue> {
    List<Lingue> findAllByOrderByNomeAsc();
}
