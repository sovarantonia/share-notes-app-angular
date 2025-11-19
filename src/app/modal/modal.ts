import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../card/card';

@Component({
  selector: 'app-modal',
  imports: [Card],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements OnInit {
  @Input() title = '';
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  ngOnInit(): void {}

  closeModal() {
    this.isOpen = false;
    this.onClose.emit();
  }

}
