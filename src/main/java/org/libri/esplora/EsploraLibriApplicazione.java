package org.libri.esplora;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;

import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;

import lombok.Getter;

@SpringBootApplication
// @Theme("TemaApplicazione")
@PWA(name = "Esplora Libri", shortName = "EsploraLibri")
@NpmPackage(value = "line-awesome", version = "1.3.0")
@NpmPackage(value = "@vaadin-component-factory/vcf-nav", version = "1.0.6")
public class EsploraLibriApplicazione extends SpringBootServletInitializer implements AppShellConfigurator {
    private static @Getter ConfigurableApplicationContext applicationContext;

    public static void main(String[] args) throws Exception {
        SpringApplicationBuilder app = new SpringApplicationBuilder(EsploraLibriApplicazione.class);
        app.build().addListeners(new ApplicationPidFileWriter("./bin/shutdown.pid"));
        applicationContext = app.run(args);
    }

    public static <T> T ottieniBean(Class<T> beanClass) {
        return applicationContext.getBean(beanClass);
    }
}

// TODO Gli dei dentro l'uomo (voto 4)
// TODO Il codice Da Vinci
// TODO Il piccolo principe