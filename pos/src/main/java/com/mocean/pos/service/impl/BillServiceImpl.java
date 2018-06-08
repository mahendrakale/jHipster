package com.mocean.pos.service.impl;

import com.mocean.pos.service.BillService;
import com.mocean.pos.domain.Bill;
import com.mocean.pos.repository.BillRepository;
import com.mocean.pos.service.dto.BillDTO;
import com.mocean.pos.service.mapper.BillMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Bill.
 */
@Service
@Transactional
public class BillServiceImpl implements BillService {

    private final Logger log = LoggerFactory.getLogger(BillServiceImpl.class);

    private final BillRepository billRepository;

    private final BillMapper billMapper;

    public BillServiceImpl(BillRepository billRepository, BillMapper billMapper) {
        this.billRepository = billRepository;
        this.billMapper = billMapper;
    }

    /**
     * Save a bill.
     *
     * @param billDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BillDTO save(BillDTO billDTO) {
        log.debug("Request to save Bill : {}", billDTO);
        Bill bill = billMapper.toEntity(billDTO);
        if(bill.getDiscount() == null) {
        	bill.setDiscount(0l);
        }
        bill = billRepository.save(bill);
        return billMapper.toDto(bill);
    }

    /**
     * Get all the bills.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BillDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Bills");
        return billRepository.findAll(pageable)
            .map(billMapper::toDto);
    }

    /**
     * Get one bill by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BillDTO findOne(Long id) {
        log.debug("Request to get Bill : {}", id);
        Bill bill = billRepository.findOne(id);
        return billMapper.toDto(bill);
    }

    /**
     * Delete the bill by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bill : {}", id);
        billRepository.delete(id);
    }
}
