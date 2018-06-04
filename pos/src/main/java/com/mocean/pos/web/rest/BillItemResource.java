package com.mocean.pos.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mocean.pos.service.BillItemService;
import com.mocean.pos.web.rest.errors.BadRequestAlertException;
import com.mocean.pos.web.rest.util.HeaderUtil;
import com.mocean.pos.service.dto.BillItemDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BillItem.
 */
@RestController
@RequestMapping("/api")
public class BillItemResource {

    private final Logger log = LoggerFactory.getLogger(BillItemResource.class);

    private static final String ENTITY_NAME = "billItem";

    private final BillItemService billItemService;

    public BillItemResource(BillItemService billItemService) {
        this.billItemService = billItemService;
    }

    /**
     * POST  /bill-items : Create a new billItem.
     *
     * @param billItemDTO the billItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new billItemDTO, or with status 400 (Bad Request) if the billItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bill-items")
    @Timed
    public ResponseEntity<BillItemDTO> createBillItem(@Valid @RequestBody BillItemDTO billItemDTO) throws URISyntaxException {
        log.debug("REST request to save BillItem : {}", billItemDTO);
        if (billItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new billItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BillItemDTO result = billItemService.save(billItemDTO);
        return ResponseEntity.created(new URI("/api/bill-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bill-items : Updates an existing billItem.
     *
     * @param billItemDTO the billItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated billItemDTO,
     * or with status 400 (Bad Request) if the billItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the billItemDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bill-items")
    @Timed
    public ResponseEntity<BillItemDTO> updateBillItem(@Valid @RequestBody BillItemDTO billItemDTO) throws URISyntaxException {
        log.debug("REST request to update BillItem : {}", billItemDTO);
        if (billItemDTO.getId() == null) {
            return createBillItem(billItemDTO);
        }
        BillItemDTO result = billItemService.save(billItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, billItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bill-items : get all the billItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of billItems in body
     */
    @GetMapping("/bill-items")
    @Timed
    public List<BillItemDTO> getAllBillItems() {
        log.debug("REST request to get all BillItems");
        return billItemService.findAll();
        }

    /**
     * GET  /bill-items/:id : get the "id" billItem.
     *
     * @param id the id of the billItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the billItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bill-items/{id}")
    @Timed
    public ResponseEntity<BillItemDTO> getBillItem(@PathVariable Long id) {
        log.debug("REST request to get BillItem : {}", id);
        BillItemDTO billItemDTO = billItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(billItemDTO));
    }

    /**
     * DELETE  /bill-items/:id : delete the "id" billItem.
     *
     * @param id the id of the billItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bill-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteBillItem(@PathVariable Long id) {
        log.debug("REST request to delete BillItem : {}", id);
        billItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
