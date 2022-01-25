package org.fiware.canismajor.mapping;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.fiware.canismajor.model.ConfigurationVO;
import org.fiware.canismajor.model.MetaDataVO;
import org.fiware.canismajor.persistence.ContextConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jsr330")
public interface ConfigMapper {

	ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	default ContextConfiguration configurationVoToContextConfiguration(ConfigurationVO configurationVO) {
		ContextConfiguration contextConfiguration = new ContextConfiguration();
		contextConfiguration.setContextMapping(configurationVO.getContextMapping());
		contextConfiguration.setContextType(configurationVO.getContextType());
		contextConfiguration.setMetaData(configurationVO.getMetadata());
		return contextConfiguration;
	}

	default ConfigurationVO contextConfigurationToConfigurationVO(ContextConfiguration contextConfiguration) {
		ConfigurationVO configurationVO = new ConfigurationVO();
		configurationVO.setContextType(contextConfiguration.getContextType());
		configurationVO.setContextMapping(contextConfiguration.getContextMapping());
		configurationVO.setMetadata(OBJECT_MAPPER.convertValue(contextConfiguration.getMetaData(), MetaDataVO.class));
		return configurationVO;
	}
}
