import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserCardItem } from '../../model/user-card-item';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-friends-card',
  imports: [MatCardModule, DatePipe, MatButton],
  templateUrl: './friends-card.html',
  styleUrl: './friends-card.css',
})
export class FriendsCard {
  @Input() mode!: 'friends' | 'sent' | 'received' | 'send-request';
  @Input() item!: UserCardItem;

  @Output() removeFriend = new EventEmitter<number>();
  @Output() cancelRequest = new EventEmitter<number>();
  @Output() acceptRequest = new EventEmitter<number>();
  @Output() declineRequest = new EventEmitter<number>();
  @Output() sendRequest = new EventEmitter<string>();
}
