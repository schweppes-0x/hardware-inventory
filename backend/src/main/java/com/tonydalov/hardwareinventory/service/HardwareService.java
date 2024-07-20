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
        return create(hardware.toEntity());
    }

    public Optional<Hardware> create(Hardware hardware){
        return Optional.of(hardwareRepository.save(hardware));
    }

    public void delete(Long id) {
        hardwareRepository.deleteById(id);
    }
}
