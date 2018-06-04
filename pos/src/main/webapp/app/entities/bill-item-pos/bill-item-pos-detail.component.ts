import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BillItemPos } from './bill-item-pos.model';
import { BillItemPosService } from './bill-item-pos.service';

@Component({
    selector: 'jhi-bill-item-pos-detail',
    templateUrl: './bill-item-pos-detail.component.html'
})
export class BillItemPosDetailComponent implements OnInit, OnDestroy {

    billItem: BillItemPos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billItemService: BillItemPosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBillItems();
    }

    load(id) {
        this.billItemService.find(id)
            .subscribe((billItemResponse: HttpResponse<BillItemPos>) => {
                this.billItem = billItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBillItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'billItemListModification',
            (response) => this.load(this.billItem.id)
        );
    }
}
