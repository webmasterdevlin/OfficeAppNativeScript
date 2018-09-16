import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IDepartment } from "~/models/department";
import { Urls } from "~/helpers/constants";
import { AuthBearer } from "~/helpers/httpHeaders";

import { isAndroid } from "tns-core-modules/platform";
import * as applicationSettings from "tns-core-modules/application-settings";
import { User } from "~/models/user.model";

@Injectable()
export class DepartmentService {
  constructor(private _httpClient: HttpClient) {}

  loadDepartments(): Observable<IDepartment[]> {
    return this._httpClient.get<IDepartment[]>(
      `${isAndroid ? Urls.department_Android : Urls.department_iOS}`,
      AuthBearer.options
    );
  }

  getDepartment(id: string): Observable<IDepartment> {
    return this._httpClient.get<IDepartment>(
      `${isAndroid ? Urls.department_Android : Urls.department_iOS}${id}`
    );
  }

  postDepartment(department: IDepartment): Observable<any> {
    return this._httpClient.post(
      `${isAndroid ? Urls.department_Android : Urls.department_iOS}${
        department.id
      }`,
      department
    );
  }

  putDepartment(department: IDepartment): Observable<any> {
    return this._httpClient.put(
      `${isAndroid ? Urls.department_Android : Urls.department_iOS}${
        department.id
      }`,
      department
    );
  }

  deleteDepartment(id: string): Observable<any> {
    return this._httpClient.delete(
      `${isAndroid ? Urls.department_Android : Urls.department_iOS}${id}`
    );
  }

  getToken(): string {
    const uString: string = applicationSettings.getString("jwt");
    const user: User = JSON.parse(atob(uString));
    return user.token;
  }
}
