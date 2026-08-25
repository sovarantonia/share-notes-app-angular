import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { map, Observable, of } from 'rxjs';
import { Dialog } from '../components/dialog/dialog';
import { FriendsCard } from '../components/friends-card/friends-card';
import { SnackbarService } from '../components/notification/snackbar-service';
import { SearchBar } from '../components/search-bar/search-bar';
import { DialogData } from '../model/dialog-data';
import { RequestRequest } from '../model/request/request-request';
import { UserCardItem } from '../model/user-card-item';
import { RequestService } from '../service/request/request-service';
import { UserService } from '../service/user/user-service';

@Component({
  selector: 'app-friends-page',
  imports: [MatTabsModule, FriendsCard, SearchBar, AsyncPipe],
  templateUrl: './friends-page.html',
  styleUrl: './friends-page.css',
})
export class FriendsPage implements OnInit {
  hasSearched = false;

  friendItems$!: Observable<UserCardItem[]>;
  sentRequestItems$!: Observable<UserCardItem[]>;
  receivedRequestItems$!: Observable<UserCardItem[]>;
  userItems$!: Observable<UserCardItem[]>;

  readonly dialog = inject(MatDialog);

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getFriends();
    this.getSentRequests();
    this.getReceivedRequests();
  }

  private getSentRequests() {
    this.sentRequestItems$ = this.requestService.getSentRequests().pipe(
      map((requests) =>
        requests.map((r) => ({
          id: r.id,
          user: r.receiver,
          sentAt: r.sentAt,
        }))
      )
    );
  }

  private getReceivedRequests() {
    this.receivedRequestItems$ = this.requestService.getReceivedRequests().pipe(
      map((requests) =>
        requests.map((r) => ({
          id: r.id,
          user: r.sender,
        }))
      )
    );
  }

  private getFriends() {
    this.friendItems$ = this.userService.getFriends().pipe(
      map((friends) =>
        friends.map((f) => ({
          id: f.id,
          user: f,
        }))
      )
    );
  }

  searchUsers(searchValue: string) {
    this.hasSearched = true;

    const value = searchValue.trim();

    if (value.length < 2) {
      this.hasSearched = false;
      this.userItems$ = of([]);
      return;
    }

    this.userItems$ = this.userService.searchUserNonFriends(value).pipe(
      map((users) =>
        users.map((user) => ({
          id: user.id,
          user,
        }))
      )
    );
  }

  searchFriends(searchValue: string) {
    const value = searchValue.trim();

    if (value.length < 2) {
      this.friendItems$ = of([]);
    }

    this.friendItems$ = this.userService.searchUserFriends(value).pipe(
      map((friends) =>
        friends.map((f) => ({
          id: f.id,
          user: f,
        }))
      )
    );
  }

  sendRequest(receiverEmail: string) {
    const request: RequestRequest = {
      receiverEmail,
    };
    this.requestService.sendRequest(request).subscribe({
      next: () => {
        this.snackbarService.open('Request was sent');
        this.getSentRequests();
        this.userItems$ = of([]);
      },
    });
  }

  deleteFriend(friendId: number) {
    const dialogData: DialogData = {
      title: 'Remove friend',
      actionName: 'Remove',
      dialogCloseActionName: 'Cancel',
      content: 'This action can not be undone',
    };
    const dialogRef = this.dialog.open(Dialog, { data: dialogData });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.requestService.removeFromFriendList(friendId).subscribe({
          next: () => {
            this.snackbarService.open('Person removed from friend list');
            this.getFriends();
          },
          error: () => {
            this.snackbarService.open('Could not remove from friend list');
          },
        });
      }
    });
  }

  acceptRequest(id: number) {
    this.requestService.accept(id).subscribe({
      next: () => {
        this.snackbarService.open('You accepted the friend request');
        this.getFriends();
        this.getReceivedRequests();
      },
      error: () => {
        this.snackbarService.open('Could not accept the request');
      },
    });
  }

  declineRequest(id: number) {
    this.requestService.decline(id).subscribe({
      next: () => {
        this.snackbarService.open('You declined the friend request');
        this.getReceivedRequests();
      },
      error: () => {
        this.snackbarService.open('Could not remove the request');
      },
    });
  }

  deleteRequest(id: number) {
    this.requestService.delete(id).subscribe({
      next: () => {
        this.snackbarService.open('You deleted the friend request');
        this.getSentRequests();
      },
      error: () => {
        this.snackbarService.open('Could not delete the request');
      },
    });
  }
}
