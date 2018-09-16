import { Component, OnInit } from "@angular/core";
import { IDepartmentModel } from "~/models/department.model";
import { DepartmentService } from "~/services/department.service";
import { ActivatedRoute } from "@angular/router";
import {asElementData} from "@angular/core/src/view";
import {extractStyleParams} from "@angular/animations/browser/src/util";
import {throwIfAlreadyLoaded} from "nativescript-angular/common/utils";
import {xdescribe} from "@angular/core/testing/src/testing_internal";

@Component({
  selector: "Main",
  moduleId: module.id,
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  departments: IDepartmentModel[] = [];

  constructor(
    private _departmentService: DepartmentService,
    private _activatedRoute: ActivatedRoute,

  ) {

  }
  ngOnInit() {
    let id: string;
    this._activatedRoute.queryParams.subscribe(p => id = p["id"]);

    let index = this.departments.findIndex(x => x.id == id);
    this.departments.splice(index + 2, 1);
    this.loadDepartments();
    console.log(index);
  }

  loadDepartments(): void {
    this._departmentService
      .loadDepartments()
      .subscribe(data => (this.departments = data));
  }
}
