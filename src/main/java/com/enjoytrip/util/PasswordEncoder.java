package com.enjoytrip.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public final class PasswordEncoder {
    private static final SecureRandom RANDOM = new SecureRandom();

    private PasswordEncoder() {
    }

    public static String hash(String rawPassword) {
        byte[] salt = new byte[16];
        RANDOM.nextBytes(salt);
        String encodedSalt = Base64.getEncoder().encodeToString(salt);
        String hash = digest(rawPassword, salt);
        return encodedSalt + ":" + hash;
    }

    public static boolean matches(String rawPassword, String stored) {
        if (stored == null || !stored.contains(":")) {
            return false;
        }
        String[] parts = stored.split(":", 2);
        byte[] salt = Base64.getDecoder().decode(parts[0]);
        String hash = digest(rawPassword, salt);
        return MessageDigest.isEqual(hash.getBytes(StandardCharsets.UTF_8), parts[1].getBytes(StandardCharsets.UTF_8));
    }

    private static String digest(String rawPassword, byte[] salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] hashed = md.digest(rawPassword.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }
}
