package org.libri.esplora.frontend.views.home;

import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.frontend.VaadinComponents.Bold;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;

public class GeneratoreCarte {
    public static Div of(RisultatoRicerca risultato) {
        Div carta = new Div();
        carta.setClassName("carta");
        carta.add(new Bold(risultato.getTitolo()));
        carta.add(new Paragraph(risultato.getAutore()));

        Div contenitoreCarta = new Div(carta);
        contenitoreCarta.setClassName("contenitore_carta");
        contenitoreCarta.addClickListener(e -> UI.getCurrent().navigate("/api/ricercaId?id=" + risultato.getIdLibro()));

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
