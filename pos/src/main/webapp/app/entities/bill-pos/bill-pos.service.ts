import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BillPos } from './bill-pos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BillPos>;

@Injectable()
export class BillPosService {

    private resourceUrl =  SERVER_API_URL + 'api/bills';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(bill: BillPos): Observable<EntityResponseType> {
        const copy = this.convert(bill);
        return this.http.post<BillPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bill: BillPos): Observable<EntityResponseType> {
        const copy = this.convert(bill);
        return this.http.put<BillPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BillPos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BillPos[]>> {
        const options = createRequestOption(req);
        return this.http.get<BillPos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BillPos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BillPos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BillPos[]>): HttpResponse<BillPos[]> {
        const jsonResponse: BillPos[] = res.body;
        const body: BillPos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BillPos.
     */
    private convertItemFromServer(bill: BillPos): BillPos {
        const copy: BillPos = Object.assign({}, bill);
        copy.billDate = this.dateUtils
            .convertLocalDateFromServer(bill.billDate);
        return copy;
    }

    /**
     * Convert a BillPos to a JSON which can be sent to the server.
     */
    private convert(bill: BillPos): BillPos {
        const copy: BillPos = Object.assign({}, bill);
        copy.billDate = this.dateUtils
            .convertLocalDateToServer(bill.billDate);
        return copy;
    }
}
