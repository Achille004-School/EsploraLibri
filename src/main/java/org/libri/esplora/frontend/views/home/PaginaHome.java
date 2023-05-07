package org.libri.esplora.frontend.views.home;

import java.util.List;

import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.frontend.VaadinComponents.Bold;
import org.libri.esplora.frontend.views.ImpaginazionePrincipale;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

@PageTitle("Home")
@Route(value = "home", layout = ImpaginazionePrincipale.class)
@RouteAlias(value = "", layout = ImpaginazionePrincipale.class)
@CssImport("./css/home.css")
public class PaginaHome extends Div {
    public PaginaHome() {
        this.setId("home");

        // TODO Cercati recentemente e cosnigliati?

        RestTemplate modelloRest = new RestTemplate();
        String urlTuttiLibri = "http://localhost:8080/EsploraLibri/api/ricerca";
        ResponseEntity<List<RisultatoRicerca>> risposta = modelloRest.exchange(urlTuttiLibri, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<RisultatoRicerca>>() {
                });

        List<RisultatoRicerca> libri = risposta.getBody();
        for (RisultatoRicerca libro : libri) {
            Div carta = new Div();
            carta.setClassName("carta");
            carta.add(new Bold(libro.getTitolo()));
            carta.add(new Paragraph(libro.getAutore()));

            Div contenitoreCarta = new Div(carta);
            contenitoreCarta.setClassName("contenitore_carta");
            contenitoreCarta.addClickListener(e -> UI.getCurrent().navigate("/api/ricercaId?id=" + libro.getIdLibro()));

            this.add(contenitoreCarta);
        }

        // TODO Cookies?
        // if (authenticatedUser.get().isEmpty()) {
        // this.add(new CookiesDiv());
        // }
    }
}
