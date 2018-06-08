package com.mocean.pos.repository;

import com.mocean.pos.domain.Tax;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Tax entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaxRepository extends JpaRepository<Tax, Long> {

}
