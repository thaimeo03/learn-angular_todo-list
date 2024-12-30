import { Component } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import { CreateTodoComponent } from "./components/create-todo/create-todo.component";
import { SearchComponent } from "./components/search/search.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";

@Component({
  selector: 'app-home',
  imports: [SearchComponent, ButtonComponent, MatIconModule, CreateTodoComponent, DialogComponent, TodoListComponent],
  providers: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isVisible: boolean = false;

  openDialog(): void {
    this.isVisible = true;
  }

  onDialogClose(): void {
    this.isVisible = false;
  }
}
