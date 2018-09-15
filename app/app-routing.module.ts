import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";
import {MainComponent} from "~/main/main.component";
import {LoginComponent} from "~/login/login.component";
import {SignupComponent} from "~/signup/signup.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {path: "main", component: MainComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    // { path: "login", loadChildren: "./login/login.module#LoginModule" },
    // { path: "home", loadChildren: "./home/home.module#HomeModule", canLoad: [LoggedInLazyLoadGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
