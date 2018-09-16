import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {MainComponent} from "~/main/main.component";
import {LoginComponent} from "~/login/login.component";
import {SignupComponent} from "~/signup/signup.component";
import {EditComponent} from "~/edit/edit.component";

const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    {path: "main", component: MainComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "edit/:id", component: EditComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
