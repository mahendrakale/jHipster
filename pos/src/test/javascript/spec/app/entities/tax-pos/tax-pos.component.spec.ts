/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PosTestModule } from '../../../test.module';
import { TaxPosComponent } from '../../../../../../main/webapp/app/entities/tax-pos/tax-pos.component';
import { TaxPosService } from '../../../../../../main/webapp/app/entities/tax-pos/tax-pos.service';
import { TaxPos } from '../../../../../../main/webapp/app/entities/tax-pos/tax-pos.model';

describe('Component Tests', () => {

    describe('TaxPos Management Component', () => {
        let comp: TaxPosComponent;
        let fixture: ComponentFixture<TaxPosComponent>;
        let service: TaxPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [TaxPosComponent],
                providers: [
                    TaxPosService
                ]
            })
            .overrideTemplate(TaxPosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaxPosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TaxPos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.taxes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
