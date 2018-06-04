/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosTestModule } from '../../../test.module';
import { PaymentPosComponent } from '../../../../../../main/webapp/app/entities/payment-pos/payment-pos.component';
import { PaymentPosService } from '../../../../../../main/webapp/app/entities/payment-pos/payment-pos.service';
import { PaymentPos } from '../../../../../../main/webapp/app/entities/payment-pos/payment-pos.model';

describe('Component Tests', () => {

    describe('PaymentPos Management Component', () => {
        let comp: PaymentPosComponent;
        let fixture: ComponentFixture<PaymentPosComponent>;
        let service: PaymentPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [PaymentPosComponent],
                providers: [
                    PaymentPosService
                ]
            })
            .overrideTemplate(PaymentPosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentPosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PaymentPos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.payments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
