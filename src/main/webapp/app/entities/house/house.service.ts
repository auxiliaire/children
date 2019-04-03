import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHouse } from 'app/shared/model/house.model';

type EntityResponseType = HttpResponse<IHouse>;
type EntityArrayResponseType = HttpResponse<IHouse[]>;

@Injectable({ providedIn: 'root' })
export class HouseService {
    public resourceUrl = SERVER_API_URL + 'api/houses';

    constructor(protected http: HttpClient) {}

    create(house: IHouse): Observable<EntityResponseType> {
        return this.http.post<IHouse>(this.resourceUrl, house, { observe: 'response' });
    }

    update(house: IHouse): Observable<EntityResponseType> {
        return this.http.put<IHouse>(this.resourceUrl, house, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHouse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHouse[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
