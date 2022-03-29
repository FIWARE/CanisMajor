package org.fiware.canismajor.dlt;

import java.net.URI;

public record RetrievalQueryInfo(URI id, String attrs, String type, String options, String link) {
}
