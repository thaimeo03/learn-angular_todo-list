import { Component } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { SearchComponent } from "./components/search/search.component";
import { ButtonComponent } from "./components/button/button.component";

@Component({
  selector: 'app-home',
  imports: [SearchComponent, ButtonComponent, MatIconModule, CreateTaskComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  hidden: boolean = true;

  openDialog() {
    this.hidden = false;
  }

  closeDialog() {
    this.hidden = true;
  }
}
