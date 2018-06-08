import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProductPos } from './product-pos.model';
import { ProductPosService } from './product-pos.service';

@Injectable()
export class ProductPosPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private productService: ProductPosService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.productService.find(id)
                    .subscribe((productResponse: HttpResponse<ProductPos>) => {
                        const product: ProductPos = productResponse.body;
                        if (product.mfDate) {
                            product.mfDate = {
                                year: product.mfDate.getFullYear(),
                                month: product.mfDate.getMonth() + 1,
                                day: product.mfDate.getDate()
                            };
                        }
                        if (product.expDate) {
                            product.expDate = {
                                year: product.expDate.getFullYear(),
                                month: product.expDate.getMonth() + 1,
                                day: product.expDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.productModalRef(component, product);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.productModalRef(component, new ProductPos());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    productModalRef(component: Component, product: ProductPos): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.product = product;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
