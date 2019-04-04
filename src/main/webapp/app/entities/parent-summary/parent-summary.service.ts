import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParentSummary } from 'app/shared/model/parent-summary.model';

type EntityResponseType = HttpResponse<IParentSummary>;
type EntityArrayResponseType = HttpResponse<IParentSummary[]>;

@Injectable({ providedIn: 'root' })
export class ParentSummaryService {
    public resourceUrl = SERVER_API_URL + 'api/parent-summaries';

    constructor(protected http: HttpClient) {}

    create(parentSummary: IParentSummary): Observable<EntityResponseType> {
        return this.http.post<IParentSummary>(this.resourceUrl, parentSummary, { observe: 'response' });
    }

    update(parentSummary: IParentSummary): Observable<EntityResponseType> {
        return this.http.put<IParentSummary>(this.resourceUrl, parentSummary, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IParentSummary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IParentSummary[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
