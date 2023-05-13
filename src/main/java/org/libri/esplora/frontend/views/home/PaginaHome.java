package org.libri.esplora.frontend.views.home;

import org.libri.esplora.frontend.views.ImpaginazionePrincipale;

import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

@PageTitle("Home")
@Route(value = "home", layout = ImpaginazionePrincipale.class)
@RouteAlias(value = "", layout = ImpaginazionePrincipale.class)
@CssImport("./css/home.css")
public class PaginaHome extends VerticalLayout {
    private final Div tuttiLibri;
    private final Label etichettaLibri;

    public PaginaHome() {
        super();

        this.setId("home");
        this.setAlignItems(Alignment.START);

        etichettaLibri = new Label();

        tuttiLibri = new Div();
        tuttiLibri.setId("libri");
        tuttiLibri.setWidthFull();
        etichettaLibri.setFor(tuttiLibri);

        // TODO Cronologia ricerche? -> session

        FormRicerca form = new FormRicerca(etichettaLibri, tuttiLibri);

        this.add(form, etichettaLibri, tuttiLibri);
    }
}
