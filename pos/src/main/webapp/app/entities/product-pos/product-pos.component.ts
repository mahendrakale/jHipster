import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductPos } from './product-pos.model';
import { ProductPosService } from './product-pos.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-product-pos',
    templateUrl: './product-pos.component.html'
})
export class ProductPosComponent implements OnInit, OnDestroy {
products: ProductPos[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productService: ProductPosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.productService.query().subscribe(
            (res: HttpResponse<ProductPos[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductPos) {
        return item.id;
    }
    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe('productListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
