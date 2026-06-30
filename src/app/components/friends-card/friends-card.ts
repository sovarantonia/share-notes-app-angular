import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs/internal/Observable';
import { UserCardItem } from '../../model/user-card-item';

@Component({
  selector: 'app-friends-card',
  imports: [AsyncPipe, MatCardModule, DatePipe],
  templateUrl: './friends-card.html',
  styleUrl: './friends-card.css',
})
export class FriendsCard {
  @Input() mode!: 'friends' | 'sent' | 'received';
  @Input() items$!: Observable<UserCardItem[]>;

  @Output() removeFriend = new EventEmitter<number>();
  @Output() cancelRequest = new EventEmitter<number>();
  @Output() acceptRequest = new EventEmitter<number>();
  @Output() declineRequest = new EventEmitter<number>();
}
