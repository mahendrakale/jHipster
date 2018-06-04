import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductPos } from './product-pos.model';
import { ProductPosPopupService } from './product-pos-popup.service';
import { ProductPosService } from './product-pos.service';
import { TaxPos, TaxPosService } from '../tax-pos';
import { InventoryPos, InventoryPosService } from '../inventory-pos';

@Component({
    selector: 'jhi-product-pos-dialog',
    templateUrl: './product-pos-dialog.component.html'
})
export class ProductPosDialogComponent implements OnInit {

    product: ProductPos;
    isSaving: boolean;

    taxes: TaxPos[];

    inventories: InventoryPos[];
    mfDateDp: any;
    expDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productService: ProductPosService,
        private taxService: TaxPosService,
        private inventoryService: InventoryPosService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.taxService
            .query({filter: 'product-is-null'})
            .subscribe((res: HttpResponse<TaxPos[]>) => {
                if (!this.product.taxId) {
                    this.taxes = res.body;
                } else {
                    this.taxService
                        .find(this.product.taxId)
                        .subscribe((subRes: HttpResponse<TaxPos>) => {
                            this.taxes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.inventoryService.query()
            .subscribe((res: HttpResponse<InventoryPos[]>) => { this.inventories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(
                this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductPos>>) {
        result.subscribe((res: HttpResponse<ProductPos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductPos) {
        this.eventManager.broadcast({ name: 'productListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTaxById(index: number, item: TaxPos) {
        return item.id;
    }

    trackInventoryById(index: number, item: InventoryPos) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-product-pos-popup',
    template: ''
})
export class ProductPosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productPopupService: ProductPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productPopupService
                    .open(ProductPosDialogComponent as Component, params['id']);
            } else {
                this.productPopupService
                    .open(ProductPosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
