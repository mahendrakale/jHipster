import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PaymentPos } from './payment-pos.model';
import { PaymentPosService } from './payment-pos.service';

@Injectable()
export class PaymentPosPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private paymentService: PaymentPosService

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
                this.paymentService.find(id)
                    .subscribe((paymentResponse: HttpResponse<PaymentPos>) => {
                        const payment: PaymentPos = paymentResponse.body;
                        if (payment.date) {
                            payment.date = {
                                year: payment.date.getFullYear(),
                                month: payment.date.getMonth() + 1,
                                day: payment.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.paymentModalRef(component, payment);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.paymentModalRef(component, new PaymentPos());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    paymentModalRef(component: Component, payment: PaymentPos): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.payment = payment;
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
