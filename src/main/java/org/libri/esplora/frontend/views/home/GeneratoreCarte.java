package org.libri.esplora.frontend.views.home;

import java.text.DecimalFormat;
import java.util.ArrayList;

import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.frontend.VaadinComponents.Bold;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;

public class GeneratoreCarte {
    private static final DecimalFormat FORMATTATORE_EURO = new DecimalFormat("#.00");

    public static Div of(RisultatoRicerca risultato) {
        Div libro = new Div();
        libro.setClassName("libro");

        Bold titoloPrezzo = new Bold(risultato.getTitolo() + (risultato.getVolume() != null ? " (" + risultato.getVolume() + "° vol.)" : ""));
        Span prezzo = new Span(risultato.getPrezzo() != -1 ? FORMATTATORE_EURO.format(risultato.getPrezzo()).replace(".", ",") + " €" : "Non disponibile");
        prezzo.setClassName("prezzo");
        titoloPrezzo.add(prezzo);
        libro.add(titoloPrezzo);

        Paragraph autoreVoto = new Paragraph(risultato.getAutore());
        Span voto = new Span(GeneratoreCarte.creaStelle(risultato.getValutazioneMedia()).toArray(new Icon[5]));
        voto.add(" (" + risultato.getNumeroValutazioni() + ")");
        voto.setClassName("voto");
        autoreVoto.add(voto);
        libro.add(autoreVoto);

        Div contenitoreCarta = new Div(libro);
        contenitoreCarta.setClassName("contenitore_libro");
        contenitoreCarta.addClickListener(evento -> UI.getCurrent().navigate("/libro/" + risultato.getIdLibro()));

        return contenitoreCarta;
    }

    public static Div[] ofArray(RisultatoRicerca[] risultati) {
        Div[] carte = new Div[risultati.length];
        for (int i = 0; i < risultati.length; i++) {
            carte[i] = GeneratoreCarte.of(risultati[i]);
        }
        return carte;
    }

    public static ArrayList<Icon> creaStelle(Double valutazioneMedia) {
        Long valutazioneArrotondata = Math.round(valutazioneMedia * 2);
        ArrayList<Icon> stelle = new ArrayList<>();
        int i = 0;

        for (; i < valutazioneArrotondata / 2; i++) {
            Icon stella = VaadinIcon.STAR.create();
            stella.setClassName("stella" + i);
            stelle.add(stella);
        }

        if (valutazioneArrotondata % 2 == 1) {
            Icon stella = VaadinIcon.STAR_HALF_LEFT_O.create();
            stella.setClassName("stella" + ++i);
            stelle.add(stella);
        }

        for (; i < 5; i++) {
            Icon stella = VaadinIcon.STAR_O.create();
            stella.setClassName("stella" + i);
            stelle.add(stella);
        }

        return stelle;
    }
}
