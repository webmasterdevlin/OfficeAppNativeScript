import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UserModel } from "~/models/user.model";
import { Observable, throwError } from "rxjs";
import { BaseUrl } from "~/helpers/constants";

import { isAndroid } from "tns-core-modules/platform";
import { TypeJson } from "~/helpers/httpHeaders";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(user: UserModel): Observable<any> {
    return this.httpClient
      .post(
        isAndroid ? BaseUrl.login_Android : BaseUrl.login_iOS,
        JSON.stringify(user),
        TypeJson
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  register(user: UserModel): Observable<any> {
    return this.httpClient
      .post(isAndroid ? BaseUrl.signup_Android : BaseUrl.signup_iOS, user, TypeJson)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }
}
