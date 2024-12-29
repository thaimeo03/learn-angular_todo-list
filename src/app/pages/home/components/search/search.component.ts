import { Component } from "@angular/core";
import { InputWithIconComponent } from "../../../../shared/input-with-icon/input-with-icon.component";
import { MatIconModule } from "@angular/material/icon";
import { ButtonComponent } from "../../../../shared/button/button.component";

@Component({
  selector: 'home-search',
  imports: [InputWithIconComponent, ButtonComponent, MatIconModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
}
