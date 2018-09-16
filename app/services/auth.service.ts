import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { UserModel } from "~/models/user.model";
import { Observable } from "rxjs";
import { Urls } from "~/helpers/constants";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { isAndroid } from "tns-core-modules/platform";
import {TypeJson} from "~/helpers/httpHeaders";

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(user: UserModel): Observable<any> {
    return this.httpClient.post(
      isAndroid ? Urls.login_Android : Urls.login_iOS,
      JSON.stringify(user),
      TypeJson
    );
  }

  register(user: UserModel): Observable<any> {
    return this.httpClient.post(
      isAndroid ? Urls.signup_Android : Urls.signup_iOS,
      user,
      TypeJson
    );
  }
}
