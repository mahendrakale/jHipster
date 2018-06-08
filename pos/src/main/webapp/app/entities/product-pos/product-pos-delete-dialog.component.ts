import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductPos } from './product-pos.model';
import { ProductPosPopupService } from './product-pos-popup.service';
import { ProductPosService } from './product-pos.service';

@Component({
    selector: 'jhi-product-pos-delete-dialog',
    templateUrl: './product-pos-delete-dialog.component.html'
})
export class ProductPosDeleteDialogComponent {

    product: ProductPos;

    constructor(
        private productService: ProductPosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productListModification',
                content: 'Deleted an product'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-pos-delete-popup',
    template: ''
})
export class ProductPosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productPopupService
                .open(ProductPosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
