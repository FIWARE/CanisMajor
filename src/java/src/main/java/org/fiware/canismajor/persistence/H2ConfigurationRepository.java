package org.fiware.canismajor.persistence;

import io.micronaut.context.annotation.Requires;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;

/**
 * Configuration repository to use H2
 */
@Requires(property = "datasources.default.dialect", value = "H2")
@JdbcRepository(dialect = Dialect.H2)
public interface H2ConfigurationRepository  extends ConfigurationRepository {
}
