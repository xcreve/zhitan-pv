package com.ruoyi.web.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.sql.init.SqlInitializationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;

@Configuration
@Profile("dev")
@ConditionalOnProperty(prefix = "spring.sql.init", name = "mode", havingValue = "always")
public class H2DevDataSourceConfig {
    @Bean
    public DataSourceInitializer h2DataSourceInitializer(
            @Qualifier("masterDataSource") DataSource dataSource,
            ResourceLoader resourceLoader,
            SqlInitializationProperties properties) {
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        for (String location : properties.getSchemaLocations()) {
            populator.addScript(resourceLoader.getResource(location));
        }
        for (String location : properties.getDataLocations()) {
            populator.addScript(resourceLoader.getResource(location));
        }
        populator.setContinueOnError(properties.isContinueOnError());
        populator.setSeparator(properties.getSeparator());
        if (properties.getEncoding() != null) {
            populator.setSqlScriptEncoding(properties.getEncoding().name());
        }
        DataSourceInitializer initializer = new DataSourceInitializer();
        initializer.setDataSource(dataSource);
        initializer.setDatabasePopulator(populator);
        return initializer;
    }
}
