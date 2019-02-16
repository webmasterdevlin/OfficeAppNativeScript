import { Injectable } from '@angular/core';
import {RouterExtensions} from "nativescript-angular";
import {CanActivate} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import * as applicationSettings from "tns-core-modules/application-settings";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor(private routerExtensions: RouterExtensions) {
    }
    canActivate() {
        const token = applicationSettings.getString("jwt");
        const jwtHelper = new JwtHelperService();
        if (token && !jwtHelper.isTokenExpired(token)){
            return true;
        }
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
        return false;
    }
}
