import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeal } from 'app/shared/model/meal.model';

type EntityResponseType = HttpResponse<IMeal>;
type EntityArrayResponseType = HttpResponse<IMeal[]>;

@Injectable({ providedIn: 'root' })
export class MealService {
    public resourceUrl = SERVER_API_URL + 'api/meals';

    constructor(protected http: HttpClient) {}

    create(meal: IMeal): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(meal);
        return this.http
            .post<IMeal>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(meal: IMeal): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(meal);
        return this.http
            .put<IMeal>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMeal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMeal[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(meal: IMeal): IMeal {
        const copy: IMeal = Object.assign({}, meal, {
            invented: meal.invented != null && meal.invented.isValid() ? meal.invented.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.invented = res.body.invented != null ? moment(res.body.invented) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((meal: IMeal) => {
                meal.invented = meal.invented != null ? moment(meal.invented) : null;
            });
        }
        return res;
    }
}
