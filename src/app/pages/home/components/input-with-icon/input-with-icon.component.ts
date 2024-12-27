import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'home-input-with-icon',
  imports: [MatIconModule],
  templateUrl: './input-with-icon.component.html',
  styleUrls: ['./input-with-icon.component.scss']
})
export class InputWithIconComponent {
  @Input() iconName: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() name: string = '';
}
