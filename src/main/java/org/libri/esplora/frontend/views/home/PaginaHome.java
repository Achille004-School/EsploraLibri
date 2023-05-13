package org.libri.esplora.frontend.views.home;

import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.frontend.views.ImpaginazionePrincipale;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H5;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.server.VaadinSession;

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
        this.setHeightFull();
        this.setPadding(false);
        this.setAlignItems(Alignment.START);

        VaadinSession sessione = UI.getCurrent().getSession();
        RisultatoRicerca ultimoLibro = (RisultatoRicerca) sessione.getAttribute("ultimo_libro");

        // DEBUG (anche detto non saper farmi i cazzi miei)
        // WebBrowser browserSessione = sessione.getBrowser();
        // StringBuilder strb = new StringBuilder()
        //     .append(browserSessione.getAddress() + " - ")
        //     .append(browserSessione.getBrowserApplication() + " ")
        //     .append(browserSessione.getBrowserMajorVersion() + "." + browserSessione.getBrowserMinorVersion() + " - ")
        //     .append(browserSessione.getLocale() + " (" + sessione.getLocale().getCountry() + ")");
        // System.out.println(strb.toString());

        tuttiLibri = new Div();
        tuttiLibri.setId("libri");
        tuttiLibri.setWidthFull();

        etichettaLibri = new Label();
        etichettaLibri.setFor(tuttiLibri);

        FormRicerca form = new FormRicerca(etichettaLibri, tuttiLibri);

        VerticalLayout contenuto = new VerticalLayout();
        contenuto.setPadding(true);
        contenuto.add(form);
        if(ultimoLibro != null) {   
            H5 etichettaUltimoVisitato = new H5("Ultimo visitato: ");
            Anchor ultimoVisitato = new Anchor("/EsploraLibri/libro/" + ultimoLibro.getIdLibro(), ultimoLibro.getTitolo() + " (" + ultimoLibro.getAutore() +")");
            etichettaUltimoVisitato.add(ultimoVisitato);
            contenuto.add(etichettaUltimoVisitato);
        }
        contenuto.add(etichettaLibri, tuttiLibri);
        this.add(contenuto);

        RestTemplate modelloRest = new RestTemplate();
        ResponseEntity<Double> risposta = modelloRest.exchange(
                "http://localhost:8080/EsploraLibri/api/prezzo_medio", HttpMethod.GET, null,
                new ParameterizedTypeReference<Double>() {
                });
        this.add(ImpaginazionePrincipale.creaFooter(risposta.getBody()));
    }

}