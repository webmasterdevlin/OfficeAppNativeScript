import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {DepartmentService} from "~/services/department.service";
import {IDepartmentModel} from "~/models/department.model";

@Component({
  selector: "Edit",
  moduleId: module.id,
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {

  department: IDepartmentModel;

  constructor(
      private _activatedRoute: ActivatedRoute,
      private _routerExtensions: RouterExtensions,
      private _departmentService: DepartmentService
  ) {}

  ngOnInit() {
      const id = this._activatedRoute.snapshot.params["id"];
  }

}
