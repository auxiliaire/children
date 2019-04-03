import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChild } from 'app/shared/model/child.model';

type EntityResponseType = HttpResponse<IChild>;
type EntityArrayResponseType = HttpResponse<IChild[]>;

@Injectable({ providedIn: 'root' })
export class ChildService {
    public resourceUrl = SERVER_API_URL + 'api/children';

    constructor(protected http: HttpClient) {}

    create(child: IChild): Observable<EntityResponseType> {
        return this.http.post<IChild>(this.resourceUrl, child, { observe: 'response' });
    }

    update(child: IChild): Observable<EntityResponseType> {
        return this.http.put<IChild>(this.resourceUrl, child, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IChild>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IChild[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
