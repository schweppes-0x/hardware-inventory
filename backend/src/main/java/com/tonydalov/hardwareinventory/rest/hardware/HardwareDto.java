package com.tonydalov.hardwareinventory.rest.hardware;

import com.tonydalov.hardwareinventory.model.Hardware;
import com.tonydalov.hardwareinventory.model.HardwareStatus;

import java.time.LocalDate;

public record HardwareDto(
        String title,
        String brand,
        String model,
        String specifications,
        LocalDate orderDate,
        String serialNumber,
        HardwareStatus status
) {
    public Hardware toEntity(){
        return Hardware.builder()
                .title(title)
                .brand(brand)
                .model(model)
                .specifications(specifications)
                .orderDate(orderDate)
                .serialNumber(serialNumber)
                .status(status)
                .build();
    }
}
