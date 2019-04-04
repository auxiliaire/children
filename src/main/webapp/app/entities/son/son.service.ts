import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISon } from 'app/shared/model/son.model';

type EntityResponseType = HttpResponse<ISon>;
type EntityArrayResponseType = HttpResponse<ISon[]>;

@Injectable({ providedIn: 'root' })
export class SonService {
    public resourceUrl = SERVER_API_URL + 'api/sons';

    constructor(protected http: HttpClient) {}

    create(son: ISon): Observable<EntityResponseType> {
        return this.http.post<ISon>(this.resourceUrl, son, { observe: 'response' });
    }

    update(son: ISon): Observable<EntityResponseType> {
        return this.http.put<ISon>(this.resourceUrl, son, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISon>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISon[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
