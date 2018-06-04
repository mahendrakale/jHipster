import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TaxPos } from './tax-pos.model';
import { TaxPosService } from './tax-pos.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tax-pos',
    templateUrl: './tax-pos.component.html'
})
export class TaxPosComponent implements OnInit, OnDestroy {
taxes: TaxPos[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private taxService: TaxPosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.taxService.query().subscribe(
            (res: HttpResponse<TaxPos[]>) => {
                this.taxes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTaxes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TaxPos) {
        return item.id;
    }
    registerChangeInTaxes() {
        this.eventSubscriber = this.eventManager.subscribe('taxListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
