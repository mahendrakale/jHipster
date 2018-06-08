import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BillPos } from './bill-pos.model';
import { BillPosService } from './bill-pos.service';

@Component({
    selector: 'jhi-bill-pos-detail',
    templateUrl: './bill-pos-detail.component.html'
})
export class BillPosDetailComponent implements OnInit, OnDestroy {

    bill: BillPos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billService: BillPosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBills();
    }

    load(id) {
        this.billService.find(id)
            .subscribe((billResponse: HttpResponse<BillPos>) => {
                this.bill = billResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBills() {
        this.eventSubscriber = this.eventManager.subscribe(
            'billListModification',
            (response) => this.load(this.bill.id)
        );
    }
}
