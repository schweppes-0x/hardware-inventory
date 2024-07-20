package com.tonydalov.hardwareinventory.rest.auth;

import com.tonydalov.hardwareinventory.model.UserRole;

public record SignUpDto(String username, String password, UserRole role) { }