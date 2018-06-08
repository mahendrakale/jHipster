package com.mocean.pos.web.rest;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.mocean.pos.business.BillGenerator;
import com.mocean.pos.domain.Bill;
import com.mocean.pos.service.dto.BillDTO;

import io.github.jhipster.web.util.ResponseUtil;

/**
 * Controller for view and generation of Bill at runtime.
 */
@RestController
@RequestMapping("/api")
public class BillGeneratorResource {
	
	private final Logger log = LoggerFactory.getLogger(BillGeneratorResource.class);
	
	private BillGenerator billGenerator;
	
	public BillGeneratorResource(BillGenerator billGenerator) {
		this.billGenerator = billGenerator;
	}

    @GetMapping("/billgen/{id}")
    @Timed
    public ResponseEntity<Bill> generateBill(@PathVariable Long id) {
    	log.debug("REST request to get generated Bill : {}", id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(billGenerator.generate(id)));
    }
}
