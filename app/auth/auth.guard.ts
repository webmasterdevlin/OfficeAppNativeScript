import { Injectable } from '@angular/core';
import {RouterExtensions} from "nativescript-angular";
import {CanActivate} from "@angular/router";
import {JwtHelper} from 'angular2-jwt';
import * as applicationSettings from "tns-core-modules/application-settings";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor(private jwtHelper: JwtHelper, private routerExtensions: RouterExtensions) {
    }
    canActivate() {
        const token = applicationSettings.getString("jwt");

        if (token && !this.jwtHelper.isTokenExpired(token)){
            return true;
        }
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
        return false;
    }
}
