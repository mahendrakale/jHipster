import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TaxPos } from './tax-pos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TaxPos>;

@Injectable()
export class TaxPosService {

    private resourceUrl =  SERVER_API_URL + 'api/taxes';

    constructor(private http: HttpClient) { }

    create(tax: TaxPos): Observable<EntityResponseType> {
        const copy = this.convert(tax);
        return this.http.post<TaxPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tax: TaxPos): Observable<EntityResponseType> {
        const copy = this.convert(tax);
        return this.http.put<TaxPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TaxPos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TaxPos[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaxPos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TaxPos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TaxPos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TaxPos[]>): HttpResponse<TaxPos[]> {
        const jsonResponse: TaxPos[] = res.body;
        const body: TaxPos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TaxPos.
     */
    private convertItemFromServer(tax: TaxPos): TaxPos {
        const copy: TaxPos = Object.assign({}, tax);
        return copy;
    }

    /**
     * Convert a TaxPos to a JSON which can be sent to the server.
     */
    private convert(tax: TaxPos): TaxPos {
        const copy: TaxPos = Object.assign({}, tax);
        return copy;
    }
}
