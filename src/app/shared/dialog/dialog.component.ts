import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  providers: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() isVisible: boolean = false; // Hiển thị dialog
  @Input() title: string = ''; // Tiêu đề
  @Input() dialogClass: string = ''; // Class tùy chỉnh cho nội dung dialog
  @Input() closable: boolean = false; // Cho phép đóng dialog

  @Output() closeEvent = new EventEmitter<void>(); // Phát sự kiện khi đóng dialog

  close(): void {
    this.isVisible = true
    this.closeEvent.emit();
  }
}
