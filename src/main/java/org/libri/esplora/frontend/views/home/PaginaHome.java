package org.libri.esplora.frontend.views.home;

import org.libri.esplora.frontend.views.ImpaginazionePrincipale;

import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
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

    public PaginaHome() {
        this.setId("home");
        this.setAlignItems(Alignment.CENTER);

        tuttiLibri = new Div();
        tuttiLibri.setId("tutti_libri");
        tuttiLibri.setWidthFull();

        // TODO Cercati recentemente e cosnigliati?

        FormRicerca form = new FormRicerca(tuttiLibri);

        this.add(form, tuttiLibri);

        // TODO Cookies?
        // if (authenticatedUser.get().isEmpty()) {
        // this.add(new CookiesDiv());
        // }
    }
}
