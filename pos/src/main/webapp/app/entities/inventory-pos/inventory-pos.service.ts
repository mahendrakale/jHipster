import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InventoryPos } from './inventory-pos.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InventoryPos>;

@Injectable()
export class InventoryPosService {

    private resourceUrl =  SERVER_API_URL + 'api/inventories';

    constructor(private http: HttpClient) { }

    create(inventory: InventoryPos): Observable<EntityResponseType> {
        const copy = this.convert(inventory);
        return this.http.post<InventoryPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(inventory: InventoryPos): Observable<EntityResponseType> {
        const copy = this.convert(inventory);
        return this.http.put<InventoryPos>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InventoryPos>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InventoryPos[]>> {
        const options = createRequestOption(req);
        return this.http.get<InventoryPos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InventoryPos[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InventoryPos = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InventoryPos[]>): HttpResponse<InventoryPos[]> {
        const jsonResponse: InventoryPos[] = res.body;
        const body: InventoryPos[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InventoryPos.
     */
    private convertItemFromServer(inventory: InventoryPos): InventoryPos {
        const copy: InventoryPos = Object.assign({}, inventory);
        return copy;
    }

    /**
     * Convert a InventoryPos to a JSON which can be sent to the server.
     */
    private convert(inventory: InventoryPos): InventoryPos {
        const copy: InventoryPos = Object.assign({}, inventory);
        return copy;
    }
}
