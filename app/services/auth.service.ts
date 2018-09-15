import { Injectable } from '@angular/core';
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AuthService {

  constructor(private _httpClient: HttpClient) { }
  
}
