import { Component, inject } from "@angular/core";
import { InputWithIconComponent } from "../../../../shared/input-with-icon/input-with-icon.component";
import { MatIconModule } from "@angular/material/icon";
import { ButtonComponent } from "../../../../shared/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TodoService } from "../../../../services/todo.service";

@Component({
  selector: 'home-search',
  imports: [InputWithIconComponent, ButtonComponent, MatIconModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  todoService = inject(TodoService)

  searchForm = new FormGroup({
    title: new FormControl('')
  })

  handleSearch() {
    this.todoService.searchTodo(this.searchForm.value.title ?? '')
  }
}
