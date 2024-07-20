package com.tonydalov.hardwareinventory.service;

import com.tonydalov.hardwareinventory.model.Hardware;
import com.tonydalov.hardwareinventory.repository.HardwareRepository;
import com.tonydalov.hardwareinventory.rest.hardware.HardwareDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HardwareService {
    private final HardwareRepository hardwareRepository;

    public List<Hardware> getAll() {
        return hardwareRepository.findAll();
    }

    public Optional<Hardware> get(Long id) {
        return hardwareRepository.findById(id);
    }
    
    public Optional<Hardware> create(HardwareDto hardware) {
        Hardware toCreate = hardware.toEntity();
        return Optional.of(hardwareRepository.save(toCreate));
    }

    public void delete(Long id) {
        hardwareRepository.deleteById(id);
    }
}
