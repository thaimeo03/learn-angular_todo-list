import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  imports: [CommonModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonComponent {
  @Input() value!: string; // Giá trị của radio button
  @Input() name!: string
  @Input() checked: boolean = false; // Trạng thái được chọn
  @Input() disabled: boolean = false; // Trạng thái vô hiệu hóa

  @Output() valueChange = new EventEmitter<void>(); // Sự kiện phát giá trị

  onSelectionChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      this.valueChange.emit();
    }
  }
}
