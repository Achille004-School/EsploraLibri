package org.libri.esplora.backend.data.repository;

import java.time.Year;
import java.util.List;
import java.util.Optional;

import org.libri.esplora.backend.data.entity.Libri;
import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.springframework.data.jpa.repository.Query;

public interface RepositoryLibri extends RepositoryAstratta<Libri> {
    @Query(value = """
        SELECT Libri.ID AS idLibro,
            Libri.ean AS ean,
            Libri.titolo AS titolo,
            Libri.prezzo AS prezzo,
            Libri.pagine AS pagine,
            Libri.descrizione AS descrizione,
            Libri.anno_edizione AS annoEdizione,
            Libri.volume AS volume,
            Libri.link AS link,
            CONCAT(Autori.nome, ' ', Autori.cognome) AS autore,
            Editori.nome AS editore,
            Generi.nome AS genere,
            Lingue.nome AS lingua,
            Lingue.cod_lingua AS codLingua,
            COALESCE(AVG(Valutazione), -1) AS valutazioneMedia,
            (
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
                                WHEN LOWER(CONCAT(Autori.nome, ' ', Autori.cognome)) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 3
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
            ) AS pertinenza
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
        HAVING valutazioneMedia >= ?8
            AND (
                ?1 = ''
                OR pertinenza > 0
            )
        ORDER BY pertinenza DESC,
            valutazioneMedia DESC
    """, nativeQuery = true)
    List<RisultatoRicerca> ricerca(String valoreRicerca, 
                                   Year annoMin, Year annoMax, 
                                   Float prezzoMin, Float prezzoMax, 
                                   Short pagineMin, Short pagineMax, 
                                   Byte valutazioneMin, 
                                   String genere, String lingua);

    @Query(value = """
        SELECT Libri.ID AS idLibro,
            Libri.ean AS ean,
            Libri.titolo AS titolo,
            Libri.prezzo AS prezzo,
            Libri.pagine AS pagine,
            Libri.descrizione AS descrizione,
            Libri.anno_edizione AS annoEdizione,
            Libri.volume AS volume,
            Libri.link AS link,
            CONCAT(Autori.nome, ' ', Autori.cognome) AS autore,
            Editori.nome AS editore,
            Generi.nome AS genere,
            Lingue.nome AS lingua,
            Lingue.cod_lingua AS codLingua,
            COALESCE(AVG(Valutazione), -1) AS valutazioneMedia
        FROM Libri
            LEFT JOIN Voti ON Libri.ID = Voti.libro
            INNER JOIN Autori ON Libri.autore = Autori.ID
            INNER JOIN Editori ON Libri.editore = Editori.ID
            INNER JOIN Generi ON Libri.genere = Generi.ID
            INNER JOIN Lingue ON Libri.lingua = Lingue.ID
        WHERE Libri.ID = ?1
        GROUP BY Libri.ID
    """, nativeQuery = true)
    Optional<RisultatoRicerca> ricercaId(Long id);
}
