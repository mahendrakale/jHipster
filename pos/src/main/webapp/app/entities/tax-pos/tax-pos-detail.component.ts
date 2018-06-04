import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TaxPos } from './tax-pos.model';
import { TaxPosService } from './tax-pos.service';

@Component({
    selector: 'jhi-tax-pos-detail',
    templateUrl: './tax-pos-detail.component.html'
})
export class TaxPosDetailComponent implements OnInit, OnDestroy {

    tax: TaxPos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private taxService: TaxPosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTaxes();
    }

    load(id) {
        this.taxService.find(id)
            .subscribe((taxResponse: HttpResponse<TaxPos>) => {
                this.tax = taxResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTaxes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'taxListModification',
            (response) => this.load(this.tax.id)
        );
    }
}
