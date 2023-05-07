package org.libri.esplora.frontend.views;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;

@CssImport("./css/root.css")
public class ImpaginazionePrincipale extends AppLayout {
    private final H2 titoloVista;

    public ImpaginazionePrincipale() {
        titoloVista = new H2();
        titoloVista.addClassNames("titolo-vista");

        // Use the drawer for the menu
        this.setPrimarySection(Section.DRAWER);

        // Make the nav bar a header
        this.addToNavbar(false, createHeaderContent());
    }

    private Component createHeaderContent() {
        VerticalLayout intestazione = new VerticalLayout();
        // Configure styling for the header
        intestazione.setId("intestazione");
        intestazione.setWidthFull();
        intestazione.setPadding(false);
        intestazione.setSpacing(false);
        intestazione.setAlignItems(Alignment.CENTER);

        Div separatore = new Div();
        separatore.setClassName("separatore");
        separatore.setHeight("5px");
        separatore.setWidthFull();

        intestazione.add(getTitoloPagina(), separatore);
        return intestazione;
    }

    private VerticalLayout getTitoloPagina() {
        VerticalLayout titoloPagina = new VerticalLayout();

        H1 nomeApp = new H1("Esplora Libri");
        nomeApp.addClassName("nome-app");

        titoloPagina.setWidthFull();
        titoloPagina.setSpacing(false);
        titoloPagina.add(nomeApp, titoloVista);
        return titoloPagina;
    }

    @Override
    protected void afterNavigation() {
        super.afterNavigation();

        // Set the view title in the header
        titoloVista.setText(this.getTitoloPaginaCorrente());
    }

    private String getTitoloPaginaCorrente() {
        PageTitle titolo = getContent().getClass().getAnnotation(PageTitle.class);
        return titolo == null ? "" : titolo.value();
    }
}