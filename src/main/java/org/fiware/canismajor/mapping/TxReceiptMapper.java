package org.fiware.canismajor.mapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micronaut.data.exceptions.MappingException;
import org.fiware.canismajor.dlt.QueryInfo;
import org.fiware.canismajor.dlt.RetrievalQueryInfo;
import org.fiware.canismajor.model.TransactionReceiptVO;
import org.fiware.ngsi.model.EntityVO;
import org.fiware.ngsi.model.PropertyVO;
import org.fiware.ngsi.model.RelationshipVO;
import org.graalvm.compiler.nodes.calc.IntegerDivRemNode;
import org.mapstruct.Mapper;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Mapper(componentModel = "jsr330")
public interface TxReceiptMapper {

	ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	// the transaction index will be appended as a id
	String ID_TEMPLATE = "urn:ngsi-ld:dlttxreceipt:%s";
	String ENTITY_TYPE = "DLTtxReceipt";
	String CONTEXT = "https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld";
	String TX_RECEIPTS_KEY = "TxReceipts";
	String REF_ENTITY_KEY = "refEntity";
	String RETRIEVAL_QUERY_KEY = "retrievalQuery";

	default EntityVO transactionReceiptToEntityVO(TransactionReceipt transactionReceipt, URI entityId, RetrievalQueryInfo queryInfo) {
		EntityVO entityVO = transactionReceiptToEntityVO(transactionReceipt, entityId);

		PropertyVO propertyVO = new PropertyVO();
		propertyVO.setType(PropertyVO.Type.PROPERTY);
		propertyVO.setValue(queryInfo);

		entityVO.getAdditionalProperties().put(RETRIEVAL_QUERY_KEY, propertyVO);
		return entityVO;
	}

	default EntityVO transactionReceiptToEntityVO(TransactionReceipt transactionReceipt, URI entityId, QueryInfo queryInfo) {
		EntityVO entityVO = transactionReceiptToEntityVO(transactionReceipt, entityId);

		PropertyVO propertyVO = new PropertyVO();
		propertyVO.setType(PropertyVO.Type.PROPERTY);
		propertyVO.setValue(queryInfo);

		entityVO.getAdditionalProperties().put(RETRIEVAL_QUERY_KEY, propertyVO);
		return entityVO;
	}

	default EntityVO transactionReceiptToEntityVO(TransactionReceipt transactionReceipt, URI entityId) {
		EntityVO entityVO = new EntityVO();
		entityVO.setAtContext(CONTEXT);
		entityVO.setId(URI.create(String.format(ID_TEMPLATE, transactionReceipt.getTransactionHash())));
		entityVO.setType(ENTITY_TYPE);
		entityVO.location(null);
		entityVO.observationSpace(null);
		entityVO.operationSpace(null);

		RelationshipVO relationshipVO = new RelationshipVO();
		relationshipVO.setObject(entityId);
		relationshipVO.setType(RelationshipVO.Type.RELATIONSHIP);

		Map<String, Object> additionalProperties = new HashMap<>();
		additionalProperties.put(TX_RECEIPTS_KEY, transactionReceiptToPropertyVO(transactionReceipt));
		additionalProperties.put(REF_ENTITY_KEY, relationshipVO);
		entityVO.setAdditionalProperties(additionalProperties);
		return entityVO;
	}

	default EntityVO transactionReceiptToEntityVO(TransactionReceipt transactionReceipt, List<URI> entityIdList) {
		EntityVO entityVO = new EntityVO();
		entityVO.setAtContext(CONTEXT);
		entityVO.setId(URI.create(String.format(ID_TEMPLATE, transactionReceipt.getTransactionHash())));
		entityVO.setType(ENTITY_TYPE);
		entityVO.location(null);
		entityVO.observationSpace(null);
		entityVO.operationSpace(null);

		PropertyVO relationShipProperty = new PropertyVO();
		relationShipProperty.setType(PropertyVO.Type.PROPERTY);
		relationShipProperty.setValue(entityIdList);

		Map<String, Object> additionalProperties = new HashMap<>();
		additionalProperties.put(TX_RECEIPTS_KEY, transactionReceiptToPropertyVO(transactionReceipt));
		additionalProperties.put(REF_ENTITY_KEY, relationShipProperty);
		entityVO.setAdditionalProperties(additionalProperties);
		return entityVO;
	}

	default PropertyVO transactionReceiptToPropertyVO(TransactionReceipt transactionReceipt) {
		PropertyVO propertyVO = new PropertyVO();
		propertyVO.setValue(transactionReceipt);
		propertyVO.setType(PropertyVO.Type.PROPERTY);
		return propertyVO;
	}

	TransactionReceiptVO transactionReceiptToTransactionReceiptVO(TransactionReceipt transactionReceipt);

	default TransactionReceiptVO entityVoToTransactionReceiptVo(EntityVO entityVO) {
		if (!entityVO.type().equals(ENTITY_TYPE)) {
			throw new MappingException(String.format("Did not receive a valid entity of type transaction for mapping. Was: %s", entityVO));
		}
		Object txReceipt = getValueFromProperty(TX_RECEIPTS_KEY, entityVO.getAdditionalProperties())
				.orElseThrow(() -> new MappingException(String.format("Did not receive a valid property %s for mapping. Was: %s", TX_RECEIPTS_KEY, entityVO.getAdditionalProperties())));

		OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		TransactionReceiptVO transactionReceiptVO = OBJECT_MAPPER.convertValue(txReceipt, TransactionReceiptVO.class);

		Optional<Object> optionalAdditionalInformation = getValueFromProperty(RETRIEVAL_QUERY_KEY, entityVO.getAdditionalProperties());
		if(optionalAdditionalInformation.isPresent()) {
			transactionReceiptVO.setAdditionalInformation(optionalAdditionalInformation.get());
		}
		return transactionReceiptVO;
	}

	default List<String> getEntityIdsFromTX(EntityVO vo) {
		if (!(vo.getAdditionalProperties().get(REF_ENTITY_KEY) instanceof Map<?, ?>)) {
			throw new MappingException(String.format("Did not receive a valid property %s for mapping. Was: %s", REF_ENTITY_KEY, vo));
		}
		Map property = ((Map) vo.getAdditionalProperties().get(REF_ENTITY_KEY));

		switch ((String) property.get("type")) {
			case PropertyVO.Type.PROPERTY_VALUE: {
				if (property.get("value") instanceof List) {
					return (List<String>) property.get("value");
				} else {
					return List.of((String) property.get("value"));
				}

			}
			case RelationshipVO.Type.RELATIONSHIP_VALUE: {
				return List.of((String) property.get("object"));
			}
			default:
				throw new MappingException(String.format("Invalid type %s of property %s.", property.get("type"), vo));
		}
	}

	private <T> Optional<T> getValueFromProperty(String propertyName, Map<String, Object> propertiesMap) {
		if (!(propertiesMap.get(propertyName) instanceof Map<?, ?>)) {
			return Optional.empty();
		}
		Map property = ((Map) propertiesMap.get(propertyName));

		switch ((String) property.get("type")) {
			case PropertyVO.Type.PROPERTY_VALUE: {
				return Optional.ofNullable((T) property.get("value"));
			}
			case RelationshipVO.Type.RELATIONSHIP_VALUE: {
				return Optional.ofNullable((T) property.get("object"));
			}
			default:
				throw new MappingException(String.format("Invalid type %s of property %s.", property.get("type"), propertiesMap));
		}
	}
}
