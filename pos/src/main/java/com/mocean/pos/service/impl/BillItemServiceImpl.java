package com.mocean.pos.service.impl;

import com.mocean.pos.service.BillItemService;
import com.mocean.pos.domain.BillItem;
import com.mocean.pos.repository.BillItemRepository;
import com.mocean.pos.service.dto.BillItemDTO;
import com.mocean.pos.service.mapper.BillItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing BillItem.
 */
@Service
@Transactional
public class BillItemServiceImpl implements BillItemService {

    private final Logger log = LoggerFactory.getLogger(BillItemServiceImpl.class);

    private final BillItemRepository billItemRepository;

    private final BillItemMapper billItemMapper;

    public BillItemServiceImpl(BillItemRepository billItemRepository, BillItemMapper billItemMapper) {
        this.billItemRepository = billItemRepository;
        this.billItemMapper = billItemMapper;
    }

    /**
     * Save a billItem.
     *
     * @param billItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BillItemDTO save(BillItemDTO billItemDTO) {
        log.debug("Request to save BillItem : {}", billItemDTO);
        BillItem billItem = billItemMapper.toEntity(billItemDTO);
        billItem = billItemRepository.save(billItem);
        return billItemMapper.toDto(billItem);
    }

    /**
     * Get all the billItems.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BillItemDTO> findAll() {
        log.debug("Request to get all BillItems");
        return billItemRepository.findAll().stream()
            .map(billItemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one billItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BillItemDTO findOne(Long id) {
        log.debug("Request to get BillItem : {}", id);
        BillItem billItem = billItemRepository.findOne(id);
        return billItemMapper.toDto(billItem);
    }

    /**
     * Delete the billItem by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BillItem : {}", id);
        billItemRepository.delete(id);
    }
}
