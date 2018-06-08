package com.mocean.pos.business;

import java.text.NumberFormat;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mocean.pos.domain.Bill;
import com.mocean.pos.domain.BillItem;
import com.mocean.pos.domain.Payment;
import com.mocean.pos.domain.Product;
import com.mocean.pos.domain.Tax;
import com.mocean.pos.service.BillService;
import com.mocean.pos.service.PaymentService;
import com.mocean.pos.service.ProductService;
import com.mocean.pos.service.TaxService;
import com.mocean.pos.service.dto.BillDTO;
import com.mocean.pos.service.dto.BillItemDTO;
import com.mocean.pos.service.dto.ProductDTO;
import com.mocean.pos.service.dto.TaxDTO;
import com.mocean.pos.service.mapper.BillItemMapper;
import com.mocean.pos.service.mapper.BillMapper;
import com.mocean.pos.service.mapper.PaymentMapper;
import com.mocean.pos.service.mapper.ProductMapper;
import com.mocean.pos.service.mapper.TaxMapper;
import com.mocean.pos.service.util.BillUtil;

@Service
public class BillGenerator {
	
	private final Logger log = LoggerFactory.getLogger(BillGenerator.class);
	
	@Autowired
	private BillService billService;

	private BillUtil billItemService;
	
	private ProductService productService;
	
	private PaymentService paymentService;
	
	private TaxService taxService;
	
	private BillMapper billMapper;
	
	private BillItemMapper billItemMapper;
	
	private PaymentMapper paymentMapper;
	
	private ProductMapper productMapper;
	
	private TaxMapper taxMapper;
	
	private NumberFormat numberFormat = NumberFormat.getInstance(Locale.ENGLISH);
	
	public BillGenerator(BillService billService, BillUtil billItemService,
			ProductService productService, BillMapper billMapper, 
			BillItemMapper billItemMapper, PaymentService paymentService, 
			PaymentMapper paymentMapper, ProductMapper productMapper, 
			TaxMapper taxMapper, TaxService taxService) {
		
		this.billItemService = billItemService;
		this.billService = billService;
		this.productService = productService;
		this.billMapper = billMapper;
		this.billItemMapper = billItemMapper;
		this.paymentService = paymentService;
		this.paymentMapper = paymentMapper;
		this.productMapper = productMapper;
		this.taxMapper = taxMapper;
		this.taxService = taxService;
	}
	
	/**
	 * Generate the bill
	 *
	 * @param billDTO
	 *            the entity to generate
	 * @return the persisted entity
	 */
	public Bill generate(Long id) {
		BillDTO billDTO = billService.findOne(id);
		log.debug("Request to generate Bill : {}", billDTO);
		
		List<BillItemDTO> billItems = billItemService.findAll(id);
		Set<BillItem> billItemsSet = billItems
										.stream()
						        		.map(billItemMapper::toEntity)
						        		.collect(Collectors.toSet());
		
		log.debug("Bill item set : {}", billItemsSet);
		
		Long totalTax = 0l;
		Long total = 0l;
		for (BillItemDTO i : billItems) {
			ProductDTO p = productService.findOne(i.getProductId());
			log.debug("bill item quantity : {} , price : {}, tax : {} ", i.getQuantity(), p.getPrice(), i.getTax());
			total +=  p.getPrice() * i.getQuantity();
			totalTax += i.getTax();
		}
		
		// Deduct discount if any
		if(billDTO.getDiscount() != null && billDTO.getDiscount() != 0l) {
			total -= billDTO.getDiscount();
		}
		
		// shift by two decimal places
		total *= 100;
		
		// add bill item total tax
		total += totalTax;

		billDTO.setTotalTax(numberFormat.format((double) totalTax/100));
		billDTO.setTotal(numberFormat.format((double) total/100));
		
		Bill bill = composeBill(billDTO, billItems);
		
		log.debug("Bill : {}", bill);
		return bill;
	}
	
	private Bill composeBill(BillDTO billDTO, List<BillItemDTO> billItems) {
		
		Set<BillItem> billItemsSet = new HashSet<>();
		
		Payment payment = paymentMapper.toEntity(paymentService.findOne(billDTO.getPaymentId()));
		for (BillItemDTO i : billItems) {
			ProductDTO p = productService.findOne(i.getProductId());
			TaxDTO t = taxService.findOne(p.getTaxId());
			
			Product product = productMapper.toEntity(p);
			BillItem bi = billItemMapper.toEntity(i);
			Tax tax = taxMapper.toEntity(t);
			
			product.setTax(tax);
			bi.setProduct(product);
			
			billItemsSet.add(bi);
			log.debug("bill item quantity : {} , price : {}, tax : {} ", i.getQuantity(), p.getPrice(), i.getTax());
		}
		
		Bill bill = billMapper.toEntity(billService.save(billDTO));
		
		bill.setItems(billItemsSet);
		bill.setPayment(payment);
		
		return bill;
	}
}
