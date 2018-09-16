import {HttpHeaderResponse, HttpHeaders} from "@angular/common/http";
import * as applicationSettings from "tns-core-modules/application-settings";

export const TypeJson = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

export const AuthBearer = {
    options: new HttpHeaderResponse({
        headers: new HttpHeaders({
            Authorization: "Bearer " + applicationSettings.getString("jwt"),
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-cache"
        })
    })
};