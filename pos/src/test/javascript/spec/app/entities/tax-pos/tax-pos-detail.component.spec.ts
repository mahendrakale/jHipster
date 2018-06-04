/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PosTestModule } from '../../../test.module';
import { TaxPosDetailComponent } from '../../../../../../main/webapp/app/entities/tax-pos/tax-pos-detail.component';
import { TaxPosService } from '../../../../../../main/webapp/app/entities/tax-pos/tax-pos.service';
import { TaxPos } from '../../../../../../main/webapp/app/entities/tax-pos/tax-pos.model';

describe('Component Tests', () => {

    describe('TaxPos Management Detail Component', () => {
        let comp: TaxPosDetailComponent;
        let fixture: ComponentFixture<TaxPosDetailComponent>;
        let service: TaxPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [TaxPosDetailComponent],
                providers: [
                    TaxPosService
                ]
            })
            .overrideTemplate(TaxPosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaxPosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TaxPos(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tax).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
