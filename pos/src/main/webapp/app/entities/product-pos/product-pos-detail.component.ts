import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductPos } from './product-pos.model';
import { ProductPosService } from './product-pos.service';

@Component({
    selector: 'jhi-product-pos-detail',
    templateUrl: './product-pos-detail.component.html'
})
export class ProductPosDetailComponent implements OnInit, OnDestroy {

    product: ProductPos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productService: ProductPosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProducts();
    }

    load(id) {
        this.productService.find(id)
            .subscribe((productResponse: HttpResponse<ProductPos>) => {
                this.product = productResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productListModification',
            (response) => this.load(this.product.id)
        );
    }
}
