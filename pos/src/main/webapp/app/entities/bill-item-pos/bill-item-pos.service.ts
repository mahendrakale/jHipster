import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BillItemPos } from './bill-item-pos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BillItemPos>;

@Injectable()
export class BillItemPosService {

    private resourceUrl =  SERVER_API_URL + 'api/bill-items';

    constructor(private http: HttpClient) { }

    create(billItem: BillItemPos): Observable<EntityResponseType> {
        const copy = this.convert(billItem);
        return this.http.post<BillItemPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(billItem: BillItemPos): Observable<EntityResponseType> {
        const copy = this.convert(billItem);
        return this.http.put<BillItemPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BillItemPos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BillItemPos[]>> {
        const options = createRequestOption(req);
        return this.http.get<BillItemPos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillItemPos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BillItemPos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BillItemPos[]>): HttpResponse<BillItemPos[]> {
        const jsonResponse: BillItemPos[] = res.body;
        const body: BillItemPos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BillItemPos.
     */
    private convertItemFromServer(billItem: BillItemPos): BillItemPos {
        const copy: BillItemPos = Object.assign({}, billItem);
        return copy;
    }

    /**
     * Convert a BillItemPos to a JSON which can be sent to the server.
     */
    private convert(billItem: BillItemPos): BillItemPos {
        const copy: BillItemPos = Object.assign({}, billItem);
        return copy;
    }
}
