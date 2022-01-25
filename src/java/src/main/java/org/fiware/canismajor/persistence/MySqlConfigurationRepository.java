package org.fiware.canismajor.persistence;

import io.micronaut.context.annotation.Requires;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;

/**
 * Configuration repository to use MySQL
 */
@Requires(property = "datasources.default.dialect", value = "MySql")
@JdbcRepository(dialect = Dialect.MYSQL)
public interface MySqlConfigurationRepository {
}
