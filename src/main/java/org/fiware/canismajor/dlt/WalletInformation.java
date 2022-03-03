package org.fiware.canismajor.dlt;

import java.net.URL;
import java.util.Optional;

public record WalletInformation(WalletType walletType, Optional<String> walletToken, Optional<URL> walletAddress) {
}
