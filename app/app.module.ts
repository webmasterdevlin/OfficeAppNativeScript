import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

import {MainComponent} from "./main/main.component";
import {LoginComponent} from "~/login/login.component";
import {SignupComponent} from "~/signup/signup.component";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import {NativeScriptFormsModule, NativeScriptRouterModule} from "nativescript-angular";
import {AuthService} from "~/services/auth.service";
import {DepartmentService} from "~/services/department.service";
import {EditComponent} from "~/edit/edit.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HttpInterceptorModule} from "~/helpers/http-interceptor.module";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        FormsModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        HttpClientModule,
        NativeScriptRouterModule,
        RouterModule,
        HttpInterceptorModule,
    ],
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        SignupComponent,
        EditComponent
    ],
    providers: [
        LoggedInLazyLoadGuard, AuthService, DepartmentService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

