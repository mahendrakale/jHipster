import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PaymentPos } from './payment-pos.model';
import { PaymentPosService } from './payment-pos.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-payment-pos',
    templateUrl: './payment-pos.component.html'
})
export class PaymentPosComponent implements OnInit, OnDestroy {
payments: PaymentPos[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private paymentService: PaymentPosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.paymentService.query().subscribe(
            (res: HttpResponse<PaymentPos[]>) => {
                this.payments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPayments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PaymentPos) {
        return item.id;
    }
    registerChangeInPayments() {
        this.eventSubscriber = this.eventManager.subscribe('paymentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
