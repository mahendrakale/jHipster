import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillItemPos } from './bill-item-pos.model';
import { BillItemPosPopupService } from './bill-item-pos-popup.service';
import { BillItemPosService } from './bill-item-pos.service';
import { ProductPos, ProductPosService } from '../product-pos';
import { BillPos, BillPosService } from '../bill-pos';

@Component({
    selector: 'jhi-bill-item-pos-dialog',
    templateUrl: './bill-item-pos-dialog.component.html'
})
export class BillItemPosDialogComponent implements OnInit {

    billItem: BillItemPos;
    isSaving: boolean;

    products: ProductPos[];

    bills: BillPos[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private billItemService: BillItemPosService,
        private productService: ProductPosService,
        private billService: BillPosService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService
            .query({filter: 'billitem-is-null'})
            .subscribe((res: HttpResponse<ProductPos[]>) => {
                if (!this.billItem.productId) {
                    this.products = res.body;
                } else {
                    this.productService
                        .find(this.billItem.productId)
                        .subscribe((subRes: HttpResponse<ProductPos>) => {
                            this.products = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.billService.query()
            .subscribe((res: HttpResponse<BillPos[]>) => { this.bills = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.billItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billItemService.update(this.billItem));
        } else {
            this.subscribeToSaveResponse(
                this.billItemService.create(this.billItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillItemPos>>) {
        result.subscribe((res: HttpResponse<BillItemPos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BillItemPos) {
        this.eventManager.broadcast({ name: 'billItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: ProductPos) {
        return item.id;
    }

    trackBillById(index: number, item: BillPos) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bill-item-pos-popup',
    template: ''
})
export class BillItemPosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billItemPopupService: BillItemPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billItemPopupService
                    .open(BillItemPosDialogComponent as Component, params['id']);
            } else {
                this.billItemPopupService
                    .open(BillItemPosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
