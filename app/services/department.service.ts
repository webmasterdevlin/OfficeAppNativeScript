import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@Injectable()
export class DepartmentService {
  constructor(private _httpClient: HttpClient) {}
}
