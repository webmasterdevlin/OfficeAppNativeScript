import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { UserModel } from "~/models/user.model";
import { isAndroid, isIOS } from "platform";
import * as applicationSettings from "tns-core-modules/application-settings";

import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { AuthService } from "~/services/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Urls } from "~/helpers/constants";
import { debug } from "tns-core-modules/utils/debug";

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
  user: UserModel;
  confirmPassword: string;

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
    this.user = new UserModel();
    console.log(applicationSettings.getString("jwt"));
  }

  ngOnInit(): void {
    console.log("Hello NgOnit");
  }

  submit(): void {
    if (!this.user.email || !this.user.password) {
      alert("Please provide both an email address and a password.");
      return;
    }

    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }

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
        alert("Please check your email for instructions on choosing a new password.");
      }
    });
  }

  private login(): void {
    this.authService
      .login(this.user)
      .toPromise()
      .then(data => {
        this.processing = false;
        applicationSettings.setString("jwt", data.token);
        this.navigateMain();
      })
      .catch(() => {
        this.processing = false;
        alert("username and password don't match.");
      });
  }

  private register(): void {
    if (this.user.password != this.confirmPassword) {
      alert("Your passwords do not match.");
      this.processing = false;
      return;
    }

    this.authService.register(this.user).toPromise().then(() => {
        this.processing = false;
        alert("Your account was successfully created.");
        this.isLoggingIn = true;
    }).catch(() =>
    {
        this.processing = false;
        alert("Unfortunately we were unable to create your account.");
        this.isLoggingIn = false;
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
}
