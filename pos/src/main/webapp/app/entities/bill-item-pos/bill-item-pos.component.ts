import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillItemPos } from './bill-item-pos.model';
import { BillItemPosService } from './bill-item-pos.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bill-item-pos',
    templateUrl: './bill-item-pos.component.html'
})
export class BillItemPosComponent implements OnInit, OnDestroy {
billItems: BillItemPos[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private billItemService: BillItemPosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.billItemService.query().subscribe(
            (res: HttpResponse<BillItemPos[]>) => {
                this.billItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBillItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BillItemPos) {
        return item.id;
    }
    registerChangeInBillItems() {
        this.eventSubscriber = this.eventManager.subscribe('billItemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
