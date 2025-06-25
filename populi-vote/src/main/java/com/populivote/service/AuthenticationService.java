package com.populivote.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    public AuthenticationService() {
    }

    public String getPollingStationCodeFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
            return jwtAuth.getToken().getClaimAsString("pollingStationCode");
        }

        throw new IllegalStateException("User token does not contain pollingStationId");
    }
}
