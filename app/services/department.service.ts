import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { DepartmentModel } from "~/models/department.model";
import { BaseUrl } from "~/helpers/constants";
import { AuthBearer } from "~/helpers/httpHeaders";

import { isAndroid } from "tns-core-modules/platform";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class DepartmentService {
  constructor(private _httpClient: HttpClient) {}

  loadDepartments(): Observable<DepartmentModel[]> {
    return this._httpClient
      .get<DepartmentModel[]>(
        `${isAndroid ? BaseUrl.department_Android : BaseUrl.department_iOS}`,
        AuthBearer.options
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  getDepartment(id: string): Observable<DepartmentModel> {
    return this._httpClient
      .get<DepartmentModel>(
        `${isAndroid ? BaseUrl.department_Android : BaseUrl.department_iOS}${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  postDepartment(department: DepartmentModel): Observable<any> {
    return this._httpClient
      .post(
        `${isAndroid ? BaseUrl.department_Android : BaseUrl.department_iOS}`,
        department
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  putDepartment(department: DepartmentModel): Observable<any> {
    return this._httpClient
      .put(
        `${isAndroid ? BaseUrl.department_Android : BaseUrl.department_iOS}${
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
        `${isAndroid ? BaseUrl.department_Android : BaseUrl.department_iOS}${id}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }
}
