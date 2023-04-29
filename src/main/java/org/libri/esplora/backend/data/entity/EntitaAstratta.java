package org.libri.esplora.backend.data.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;

import lombok.Data;
    
@Data
@MappedSuperclass
public abstract class EntitaAstratta {

    @Id
    @NotNull
    @GeneratedValue
    @Column(nullable = false, name = "ID", unique = true)
    private Long id;

    @Override
    public int hashCode() {
        if (id != null) {
            return id.hashCode();
        }
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof EntitaAstratta)) {
            return false; // null or other class
        }
        EntitaAstratta other = (EntitaAstratta) obj;

        if (id != null) {
            return id.equals(other.id);
        }
        return super.equals(other);
    }
}
