package org.libri.esplora;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;

import lombok.Getter;

@SpringBootApplication
@PWA(name="Esplora Libri", shortName="EsploraLibri")
public class EsploraLibriApplicazione extends SpringBootServletInitializer implements AppShellConfigurator {
    private static @Getter ConfigurableApplicationContext applicationContext;

	public static void main(String[] args) throws Exception {
        SpringApplicationBuilder app = new SpringApplicationBuilder(EsploraLibriApplicazione.class);
        app.build().addListeners(new ApplicationPidFileWriter("./bin/shutdown.pid"));
        applicationContext = app.run(args);
    }
}
