import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillPos } from './bill-pos.model';
import { BillPosPopupService } from './bill-pos-popup.service';
import { BillPosService } from './bill-pos.service';
import { PaymentPos, PaymentPosService } from '../payment-pos';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-bill-pos-dialog',
    templateUrl: './bill-pos-dialog.component.html'
})
export class BillPosDialogComponent implements OnInit {

    bill: BillPos;
    isSaving: boolean;

    payments: PaymentPos[];

    users: User[];
    billDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private billService: BillPosService,
        private paymentService: PaymentPosService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.paymentService
            .query({filter: 'bill-is-null'})
            .subscribe((res: HttpResponse<PaymentPos[]>) => {
                if (!this.bill.paymentId) {
                    this.payments = res.body;
                } else {
                    this.paymentService
                        .find(this.bill.paymentId)
                        .subscribe((subRes: HttpResponse<PaymentPos>) => {
                            this.payments = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billService.update(this.bill));
        } else {
            this.subscribeToSaveResponse(
                this.billService.create(this.bill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillPos>>) {
        result.subscribe((res: HttpResponse<BillPos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BillPos) {
        this.eventManager.broadcast({ name: 'billListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPaymentById(index: number, item: PaymentPos) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bill-pos-popup',
    template: ''
})
export class BillPosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billPopupService: BillPosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billPopupService
                    .open(BillPosDialogComponent as Component, params['id']);
            } else {
                this.billPopupService
                    .open(BillPosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
