import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { User } from "~/models/user.model";
import {isAndroid, isIOS} from "platform";
import * as applicationSettings from 'tns-core-modules/application-settings'

import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { AuthService } from "~/services/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Urls} from "~/helpers/constants";
import {debug} from "tns-core-modules/utils/debug";

@Component({
  selector: "Login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoggingIn: boolean = true;
  isAuthenticating: boolean = false;
  processing: boolean = false;
  user: User;

  constructor(
    private _routerExtensions: RouterExtensions,
    private zone: NgZone,
    private page: Page,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.page.actionBarHidden = true;
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.className = "page-login-container";
    this.page.statusBarStyle = "dark";
    this.user = new User();
    console.log(applicationSettings.getString("jwt"));
  }

  toSignupPage(): void {}

  ngOnInit(): void {
    console.log("Hello NgOnit");
  }

  submit(): void {
    // if (!this.user.email || !this.user.password) {
    //   alert("Please provide both an email address and a password.");
    //   return;
    // }

    // if (!this.user.isValidEmail()) {
    //   alert("Enter a valid email address.");
    //   return;
    // }

    this.processing = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  toggleForm(): void {
    this.isLoggingIn = !this.isLoggingIn;
  }

  forgotPassword(): void {
    prompt({
      title: "Forgot Password",
      message: "Enter the email address",
      inputType: "email",
      defaultText: "",
      okButtonText: "OK",
      cancelButtonText: "Cancel"
    }).then(data => {
      if (data.result) {
        alert("recovering password");
      }
    });
  }

  private navigateMain(): void {
    this.zone.run(() => {
      this._routerExtensions.navigate(["main"], {
        clearHistory: true,
        animated: true,
        transition: {
          name: "slideTop",
          duration: 350,
          curve: "ease"
        }
      });
    });
  }

  private login(): void {

    this.authService.login(this.user).subscribe(data => {
        console.log(data.token);
        applicationSettings.setString('jwt', data.token);
    });
    this.processing = false;
    this.navigateMain();
  }

  private register(): void {
    this.processing = false;
    console.log("Registered");
    this.isLoggingIn = true;
  }

    // login() {
    //     if (!Kinvey.User.getActiveUser() == null) {
    //         Kinvey.User.loginWithMIC('http://example.com')
    //             .then((user: Kinvey.User) => {
    //                 this.navigateHome();
    //                 console.log("user: " + JSON.stringify(user));
    //             })
    //             .catch((error: Kinvey.BaseError) => {
    //                 alert("An error occurred. Check your Kinvey settings.");
    //                 console.log("error: " + error);
    //             });
    //     } else {
    //         this.navigateHome();
    //     }
    // }
}
