import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IDepartmentModel } from "~/models/department.model";
import { Urls } from "~/helpers/constants";
import { AuthBearer } from "~/helpers/httpHeaders";

import { isAndroid } from "tns-core-modules/platform";

@Injectable()
export class DepartmentService {
  constructor(private _httpClient: HttpClient) {}

  loadDepartments(): Observable<IDepartmentModel[]> {
    return this._httpClient.get<IDepartmentModel[]>(
      `${isAndroid ? Urls.department_Android : Urls.department_iOS}`
    );
  }

  getDepartment(id: string): Observable<IDepartmentModel> {
    return this._httpClient.get<IDepartmentModel>(
      `${isAndroid ? Urls.department_Android : Urls.department_iOS}${id}`
    );
  }

  postDepartment(department: IDepartmentModel): Observable<any> {
    return this._httpClient.post(
      `${isAndroid ? Urls.department_Android : Urls.department_iOS}${
        department.id
      }`,
      department
    );
  }

  putDepartment(department: IDepartmentModel): Observable<any> {
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
}
