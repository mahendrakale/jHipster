import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BillPos } from './bill-pos.model';
import { BillPosService } from './bill-pos.service';

@Injectable()
export class BillPosPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private billService: BillPosService

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
                this.billService.find(id)
                    .subscribe((billResponse: HttpResponse<BillPos>) => {
                        const bill: BillPos = billResponse.body;
                        if (bill.billDate) {
                            bill.billDate = {
                                year: bill.billDate.getFullYear(),
                                month: bill.billDate.getMonth() + 1,
                                day: bill.billDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.billModalRef(component, bill);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.billModalRef(component, new BillPos());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    billModalRef(component: Component, bill: BillPos): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bill = bill;
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
