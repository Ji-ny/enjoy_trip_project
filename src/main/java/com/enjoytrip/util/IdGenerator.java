package com.enjoytrip.util;

import java.util.UUID;

public final class IdGenerator {
    private IdGenerator() {
    }

    public static String generate(String prefix) {
        String id = UUID.randomUUID().toString().replaceAll("-", "");
        return prefix + id;
    }
}
