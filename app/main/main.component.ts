import { Component, OnInit } from "@angular/core";

import { DepartmentService } from "~/services/department.service";
import * as applicationSettings from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: "Main",
  moduleId: module.id,
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  department$;
  processing: boolean = false;

  constructor(
    private _departmentService: DepartmentService,
    private _routerExtensions: RouterExtensions
  ) {
    this.refresh();
  }
  ngOnInit() {
    this.department$.refresh();
  }

  refresh(): void {
    this.processing = true;
    this._departmentService
      .loadDepartments()
      .pipe(data => (this.department$ = data))
      .subscribe(() => (this.processing = false));
  }

  logout() {
    applicationSettings.remove("jwt");
    applicationSettings.clear();
    this._routerExtensions.navigate(["/login"], { clearHistory: true });
  }
}
