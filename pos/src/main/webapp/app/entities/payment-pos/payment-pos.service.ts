import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PaymentPos } from './payment-pos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PaymentPos>;

@Injectable()
export class PaymentPosService {

    private resourceUrl =  SERVER_API_URL + 'api/payments';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(payment: PaymentPos): Observable<EntityResponseType> {
        const copy = this.convert(payment);
        return this.http.post<PaymentPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(payment: PaymentPos): Observable<EntityResponseType> {
        const copy = this.convert(payment);
        return this.http.put<PaymentPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PaymentPos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PaymentPos[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaymentPos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaymentPos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PaymentPos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PaymentPos[]>): HttpResponse<PaymentPos[]> {
        const jsonResponse: PaymentPos[] = res.body;
        const body: PaymentPos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PaymentPos.
     */
    private convertItemFromServer(payment: PaymentPos): PaymentPos {
        const copy: PaymentPos = Object.assign({}, payment);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(payment.date);
        return copy;
    }

    /**
     * Convert a PaymentPos to a JSON which can be sent to the server.
     */
    private convert(payment: PaymentPos): PaymentPos {
        const copy: PaymentPos = Object.assign({}, payment);
        copy.date = this.dateUtils
            .convertLocalDateToServer(payment.date);
        return copy;
    }
}
