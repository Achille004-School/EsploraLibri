package org.libri.esplora.frontend.views.home;

import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.frontend.VaadinComponents.Bold;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;

public class GeneratoreCarte {
    public static Div of(RisultatoRicerca risultato) {
        Short volumeLibro = risultato.getVolume();
        String parteVolume;
        if(volumeLibro != null) {
            parteVolume = " (" + volumeLibro + "° vol.)";
        } else {
            parteVolume = "";
        }

        Div carta = new Div();
        carta.setClassName("libro");
        carta.add(new Bold(risultato.getTitolo() + parteVolume));
        carta.add(new Paragraph(risultato.getAutore()));

        Div contenitoreCarta = new Div(carta);
        contenitoreCarta.setClassName("contenitore_libro");
        contenitoreCarta.addClickListener(e -> UI.getCurrent().navigate("/api/ricercaId?id=" + risultato.getIdLibro()));

        // TODO voto medio e prezzo

        return contenitoreCarta;
    }

    public static Div[] ofArray(RisultatoRicerca[] risultati) {
        Div[] carte = new Div[risultati.length];
        for (int i = 0; i < risultati.length; i++) {
            carte[i] = GeneratoreCarte.of(risultati[i]);
        }
        return carte;
    }
}
