import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { User } from "~/models/user.model";

import { connectionType, getConnectionType } from "connectivity";

import { alert, prompt } from "tns-core-modules/ui/dialogs";

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
    private page: Page
  ) {
    this.page.actionBarHidden = true;
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.className = "page-login-container";
    this.page.statusBarStyle = "dark";
    this.user = new User();
    console.log("Hello Constructor");
  }

  toSignupPage(): void {}

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
        alert("recovering password");
      }
    });
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
    if (getConnectionType() === connectionType.none) {
      alert("Please check your internet connectivity");
      return;
    }

    this.processing = false;
    console.log("Logged in");
    this.navigateMain();
  }

  private register(): void {
    if (getConnectionType() === connectionType.none) {
      alert("Please check your internet connectivity");
      return;
    }

    this.processing = false;
    console.log("Registered");
    this.isLoggingIn = true;
  }
}
