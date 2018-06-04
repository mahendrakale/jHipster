/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosTestModule } from '../../../test.module';
import { BillItemPosComponent } from '../../../../../../main/webapp/app/entities/bill-item-pos/bill-item-pos.component';
import { BillItemPosService } from '../../../../../../main/webapp/app/entities/bill-item-pos/bill-item-pos.service';
import { BillItemPos } from '../../../../../../main/webapp/app/entities/bill-item-pos/bill-item-pos.model';

describe('Component Tests', () => {

    describe('BillItemPos Management Component', () => {
        let comp: BillItemPosComponent;
        let fixture: ComponentFixture<BillItemPosComponent>;
        let service: BillItemPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [BillItemPosComponent],
                providers: [
                    BillItemPosService
                ]
            })
            .overrideTemplate(BillItemPosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BillItemPosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BillItemPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BillItemPos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.billItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
