/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PosTestModule } from '../../../test.module';
import { ProductPosDetailComponent } from '../../../../../../main/webapp/app/entities/product-pos/product-pos-detail.component';
import { ProductPosService } from '../../../../../../main/webapp/app/entities/product-pos/product-pos.service';
import { ProductPos } from '../../../../../../main/webapp/app/entities/product-pos/product-pos.model';

describe('Component Tests', () => {

    describe('ProductPos Management Detail Component', () => {
        let comp: ProductPosDetailComponent;
        let fixture: ComponentFixture<ProductPosDetailComponent>;
        let service: ProductPosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PosTestModule],
                declarations: [ProductPosDetailComponent],
                providers: [
                    ProductPosService
                ]
            })
            .overrideTemplate(ProductPosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductPosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductPosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductPos(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.product).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
