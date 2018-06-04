import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ProductPos } from './product-pos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductPos>;

@Injectable()
export class ProductPosService {

    private resourceUrl =  SERVER_API_URL + 'api/products';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(product: ProductPos): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.post<ProductPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(product: ProductPos): Observable<EntityResponseType> {
        const copy = this.convert(product);
        return this.http.put<ProductPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductPos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductPos[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductPos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductPos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductPos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductPos[]>): HttpResponse<ProductPos[]> {
        const jsonResponse: ProductPos[] = res.body;
        const body: ProductPos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductPos.
     */
    private convertItemFromServer(product: ProductPos): ProductPos {
        const copy: ProductPos = Object.assign({}, product);
        copy.mfDate = this.dateUtils
            .convertLocalDateFromServer(product.mfDate);
        copy.expDate = this.dateUtils
            .convertLocalDateFromServer(product.expDate);
        return copy;
    }

    /**
     * Convert a ProductPos to a JSON which can be sent to the server.
     */
    private convert(product: ProductPos): ProductPos {
        const copy: ProductPos = Object.assign({}, product);
        copy.mfDate = this.dateUtils
            .convertLocalDateToServer(product.mfDate);
        copy.expDate = this.dateUtils
            .convertLocalDateToServer(product.expDate);
        return copy;
    }
}
