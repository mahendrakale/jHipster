/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PosTestModule } from '../../../test.module';
import { ProductPosDialogComponent } from '../../../../../../main/webapp/app/entities/product-pos/product-pos-dialog.component';
import { ProductPosService } from '../../../../../../main/webapp/app/entities/product-pos/product-pos.service';
import { ProductPos } from '../../../../../../main/webapp/app/entities/product-pos/product-pos.model';
import { TaxPosService } from '../../../../../../main/webapp/app/entities/tax-pos';

describe('Component Tests', () => {

    describe('ProductPos Management Dialog Component', () => {
        let comp: ProductPosDialogComponent;
        let fixture: ComponentFixture<ProductPosDialogComponent>;
        let service: ProductPosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [ProductPosDialogComponent],
                providers: [
                    TaxPosService,
                    ProductPosService
                ]
            })
            .overrideTemplate(ProductPosDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductPosDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductPosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductPos(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.product = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductPos();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.product = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
