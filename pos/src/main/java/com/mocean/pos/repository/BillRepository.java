package com.mocean.pos.repository;

import com.mocean.pos.domain.Bill;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Bill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

}
