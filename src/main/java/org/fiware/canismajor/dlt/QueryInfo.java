package org.fiware.canismajor.dlt;

import java.util.Optional;

public record QueryInfo(String id, String idPattern, String type, String attrs, String q, String georel, String geometry, String coodrinates, String geoproperty, String csf, Integer limit, Integer offset, String options, String link) {
}
