package com.mocean.pos.service.util;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mocean.pos.domain.BillItem;
import com.mocean.pos.service.BillItemService;
import com.mocean.pos.service.dto.BillItemDTO;
import com.mocean.pos.service.mapper.BillItemMapper;

@Service
public class BillUtil {
	
	@Autowired
	private BillItemService billItemService;
	
	private BillItemMapper billItemMapper;
	
	public BillUtil(BillItemService billItemService, BillItemMapper billItemMapper) {
		this.billItemMapper = billItemMapper;
		this.billItemService = billItemService;
	}
	
	public List<BillItemDTO> findAll(Long billId) {
		List<BillItemDTO> dtos = billItemService.findAll();
		return dtos.stream()
				.filter(i -> i.getBillId().equals(billId))
//				.map(billItemMapper::toEntity)
				.collect(Collectors.toCollection(LinkedList::new));
	}
}