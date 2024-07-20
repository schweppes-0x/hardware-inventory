package com.tonydalov.hardwareinventory.rest.hardware;

import com.tonydalov.hardwareinventory.model.Hardware;
import com.tonydalov.hardwareinventory.service.HardwareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hardware")
public class HardwareController {

    private final HardwareService hardwareService;

    @GetMapping
    public ResponseEntity<List<Hardware>> findAll() {
        return ResponseEntity.ok(hardwareService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        var found = hardwareService.get(id);

        if(found.isPresent()) {
            return ResponseEntity.ok(found.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createNew(@RequestBody HardwareDto hardware) {
        var created = hardwareService.create(hardware);

        if(created.isPresent()){
            return ResponseEntity.ok(created.get());
        }else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        hardwareService.delete(id);
        return ResponseEntity.ok().build();
    }
}
