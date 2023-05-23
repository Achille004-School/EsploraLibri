package org.libri.esplora.backend.data.repository;

import java.time.Year;
import java.util.List;

import org.libri.esplora.backend.data.entity.Libri;
import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.springframework.data.jpa.repository.Query;

public interface RepositoryLibri extends RepositoryAstratta<Libri> {
    @Query(value = """
        SELECT Libri.ID
        FROM Libri
            LEFT JOIN Voti ON Libri.ID = Voti.libro
            INNER JOIN Autori ON Libri.autore = Autori.ID
            INNER JOIN Editori ON Libri.editore = Editori.ID
            INNER JOIN Generi ON Libri.genere = Generi.ID
            INNER JOIN Lingue ON Libri.lingua = Lingue.ID
        WHERE Libri.anno_edizione BETWEEN ?2 AND ?3
            AND Libri.prezzo BETWEEN ?4 AND ?5
            AND Libri.pagine BETWEEN ?6 AND ?7
            AND (
                Generi.nome = ?9
                OR ?9 = ''
            )
            AND (
                Lingue.nome = ?10
                OR ?10 = ''
            )
        GROUP BY Libri.ID
        HAVING COALESCE(AVG(Voti.valutazione), 0) >= ?8
            AND (
                ?1 = ''
                OR (
                    CASE
                        WHEN ?1 <> '' THEN (
                            (
                                CASE
                                    WHEN Libri.ean = ?1 THEN 20
                                    ELSE 0
                                END
                            ) + (
                                CASE
                                    WHEN LOWER(Libri.titolo) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 5
                                    ELSE 0
                                END
                            ) + (
                                CASE
                                    WHEN LOWER(
                                        CONCAT(Autori.nome, ' ', Autori.cognome)
                                    ) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 3
                                    ELSE 0
                                END
                            ) + (
                                CASE
                                    WHEN LOWER(Libri.descrizione) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 1
                                    ELSE 0
                                END
                            )
                        )
                        ELSE 0
                    END
                ) > 0
            )
        ORDER BY (
                CASE
                    WHEN ?1 <> '' THEN (
                        (
                            CASE
                                WHEN Libri.ean = ?1 THEN 20
                                ELSE 0
                            END
                        ) + (
                            CASE
                                WHEN LOWER(Libri.titolo) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 5
                                ELSE 0
                            END
                        ) + (
                            CASE
                                WHEN LOWER(
                                    CONCAT(Autori.nome, ' ', Autori.cognome)
                                ) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 3
                                ELSE 0
                            END
                        ) + (
                            CASE
                                WHEN LOWER(Libri.descrizione) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 1
                                ELSE 0
                            END
                        )
                    )
                    ELSE 0
                END
            ) DESC,
            COALESCE(AVG(Voti.valutazione), 0) DESC
        LIMIT ?11
        """, nativeQuery = true)
    List<Long> ricerca(String valoreRicerca, 
        Year annoMin, Year annoMax, 
        Float prezzoMin, Float prezzoMax, 
        Short pagineMin, Short pagineMax, 
        Double valutazioneMin, String genere,
        String lingua, Integer maxRisultati);

    @Query(value = """
        SELECT new org.libri.esplora.backend.data.service.RisultatoRicerca(
                Libri.id,
                Libri.ean,
                Libri.titolo,
                Libri.prezzo,
                Libri.pagine,
                Libri.descrizione,
                Libri.annoEdizione,
                Libri.volume,
                Libri.link,
                CONCAT(Autori.nomeAutore, ' ', Autori.cognomeAutore),
                Editori.nome,
                Generi.nome,
                Lingue.nome,
                Lingue.codLingua,
                COUNT(Voti.valutazione),
                COALESCE(AVG(Voti.valutazione), 0)
            )
        FROM Libri Libri
            LEFT JOIN Libri.voti Voti
            INNER JOIN Libri.autore Autori
            INNER JOIN Libri.editore Editori
            INNER JOIN Libri.genere Generi
            INNER JOIN Libri.lingua Lingue
        WHERE Libri.id IN ?1
        GROUP BY Libri.id
        """)
    List<RisultatoRicerca> ricercaId(Long[] id);

    @Query(value = "SELECT AVG(Prezzo) FROM Libri WHERE Prezzo > -1", nativeQuery = true)
    Double prezzoMedio();
}
