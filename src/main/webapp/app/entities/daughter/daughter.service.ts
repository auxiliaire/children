import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDaughter } from 'app/shared/model/daughter.model';

type EntityResponseType = HttpResponse<IDaughter>;
type EntityArrayResponseType = HttpResponse<IDaughter[]>;

@Injectable({ providedIn: 'root' })
export class DaughterService {
    public resourceUrl = SERVER_API_URL + 'api/daughters';

    constructor(protected http: HttpClient) {}

    create(daughter: IDaughter): Observable<EntityResponseType> {
        return this.http.post<IDaughter>(this.resourceUrl, daughter, { observe: 'response' });
    }

    update(daughter: IDaughter): Observable<EntityResponseType> {
        return this.http.put<IDaughter>(this.resourceUrl, daughter, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDaughter>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDaughter[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
