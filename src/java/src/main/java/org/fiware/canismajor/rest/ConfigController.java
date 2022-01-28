package org.fiware.canismajor.rest;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fiware.canismajor.api.ConfigApi;
import org.fiware.canismajor.mapping.ConfigMapper;
import org.fiware.canismajor.model.ConfigurationVO;
import org.fiware.canismajor.persistence.ConfigurationRepository;
import org.fiware.canismajor.persistence.ContextConfiguration;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ConfigController implements ConfigApi {

	private final ConfigurationRepository configurationRepository;
	private final ConfigMapper configMapper;

	@Override
	public HttpResponse<Object> createConfig(ConfigurationVO configurationVO) {
		if (configurationRepository.findByEntityType(configurationVO.getEntityType()).isPresent()) {
			return HttpResponse.status(HttpStatus.CONFLICT);
		}

		configurationRepository.save(configMapper.configurationVoToContextConfiguration(configurationVO));
		return HttpResponse.status(HttpStatus.CREATED);
	}

	@Override
	public HttpResponse<Object> deleteConfigByEntityType(String contextType) {
		Optional<ContextConfiguration> optionalContextConfiguration = configurationRepository.findByEntityType(contextType);
		if (optionalContextConfiguration.isEmpty()) {
			return HttpResponse.notFound();
		}
		return HttpResponse.noContent();
	}

	@Override
	public HttpResponse<List<ConfigurationVO>> getConfig() {
		return HttpResponse.ok(StreamSupport.stream(configurationRepository.findAll().spliterator(), false)
				.map(configMapper::contextConfigurationToConfigurationVO)
				.collect(Collectors.toList()));
	}

	@Override
	public HttpResponse<ConfigurationVO> getConfigByEntityType(String contextType) {
		return configurationRepository
				.findByEntityType(contextType)
				.map(configMapper::contextConfigurationToConfigurationVO)
				.map(HttpResponse::ok)
				.orElse(HttpResponse.notFound());
	}

	@Override
	public HttpResponse<Object> updateConfigByEntityType(String contextType, ConfigurationVO configurationVO) {
		Optional<ContextConfiguration> optionalContextConfiguration = configurationRepository.findByEntityType(contextType);
		if (optionalContextConfiguration.isEmpty()) {
			return HttpResponse.notFound();
		};
		configurationRepository.save(configMapper.configurationVoToContextConfiguration(configurationVO));
		return HttpResponse.noContent();
	}
}
