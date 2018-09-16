import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { IDepartmentModel } from "~/models/department.model";
import { Urls } from "~/helpers/constants";
import { AuthBearer } from "~/helpers/httpHeaders";

import { isAndroid } from "tns-core-modules/platform";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class DepartmentService {
  constructor(private _httpClient: HttpClient) {}

  loadDepartments(): Observable<IDepartmentModel[]> {
    return this._httpClient
      .get<IDepartmentModel[]>(
        `${isAndroid ? Urls.department_Android : Urls.department_iOS}`,
        AuthBearer.options
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  getDepartment(id: string): Observable<IDepartmentModel> {
    return this._httpClient
      .get<IDepartmentModel>(
        `${isAndroid ? Urls.department_Android : Urls.department_iOS}${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  postDepartment(department: IDepartmentModel): Observable<any> {
    return this._httpClient
      .post(
        `${isAndroid ? Urls.department_Android : Urls.department_iOS}`,
        department
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  putDepartment(department: IDepartmentModel): Observable<any> {
    return this._httpClient
      .put(
        `${isAndroid ? Urls.department_Android : Urls.department_iOS}${
          department.id
        }`,
        department
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  deleteDepartment(id: string): Observable<any> {
    return this._httpClient
      .delete(
        `${isAndroid ? Urls.department_Android : Urls.department_iOS}${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }
}
