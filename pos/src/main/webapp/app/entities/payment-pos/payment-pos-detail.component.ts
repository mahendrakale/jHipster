import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PaymentPos } from './payment-pos.model';
import { PaymentPosService } from './payment-pos.service';

@Component({
    selector: 'jhi-payment-pos-detail',
    templateUrl: './payment-pos-detail.component.html'
})
export class PaymentPosDetailComponent implements OnInit, OnDestroy {

    payment: PaymentPos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private paymentService: PaymentPosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPayments();
    }

    load(id) {
        this.paymentService.find(id)
            .subscribe((paymentResponse: HttpResponse<PaymentPos>) => {
                this.payment = paymentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPayments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paymentListModification',
            (response) => this.load(this.payment.id)
        );
    }
}
