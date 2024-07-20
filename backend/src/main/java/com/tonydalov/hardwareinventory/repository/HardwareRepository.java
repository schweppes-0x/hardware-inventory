package com.tonydalov.hardwareinventory.repository;

import com.tonydalov.hardwareinventory.model.Hardware;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HardwareRepository extends JpaRepository<Hardware, Long> {
}
