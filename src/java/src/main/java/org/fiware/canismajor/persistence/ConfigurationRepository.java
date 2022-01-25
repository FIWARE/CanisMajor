package org.fiware.canismajor.persistence;

import io.micronaut.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface ConfigurationRepository extends CrudRepository<ContextConfiguration, UUID> {

	Optional<ContextConfiguration> findByContextType(String contxtType);
}
