package org.libri.esplora.backend.data.repository;

import java.util.List;

import org.libri.esplora.backend.data.entity.Generi;

public interface RepositoryGeneri extends RepositoryAstratta<Generi> {
    List<Generi> findAllByOrderByNomeAsc();
}
