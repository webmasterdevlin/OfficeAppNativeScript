import { Component, OnInit } from "@angular/core";
import { IDepartment } from "~/models/department";

@Component({
  selector: "Main",
  moduleId: module.id,
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  departments: Array<IDepartment>;

  constructor() {}
  ngOnInit() {

  }
}
