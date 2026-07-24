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
import { RequestResponse } from '../model/request/request-response';
import { UserCardItem } from '../model/user-card-item';
import { UserInfo } from '../model/user/user-info';
import { RequestService } from '../service/request/request-service';
import { UserService } from '../service/user/user-service';

@Component({
  selector: 'app-friends-page',
  imports: [MatTabsModule, FriendsCard, SearchBar, AsyncPipe],
  templateUrl: './friends-page.html',
  styleUrl: './friends-page.css',
})
export class FriendsPage implements OnInit {
  friends$!: Observable<UserInfo[]>;
  sentRequests$!: Observable<RequestResponse[]>;
  receivedRequests$!: Observable<RequestResponse[]>;
  users$!: Observable<UserInfo[]>;

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
    this.sentRequests$ = this.requestService.getSentRequests();
    this.sentRequestItems$ = this.sentRequests$.pipe(
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
    this.receivedRequests$ = this.requestService.getReceivedRequests();
    this.receivedRequestItems$ = this.receivedRequests$.pipe(
      map((requests) =>
        requests.map((r) => ({
          id: r.id,
          user: r.sender,
        }))
      )
    );
  }

  private getFriends() {
    this.friends$ = this.userService.getFriends();
    this.friendItems$ = this.friends$.pipe(
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

    if (searchValue.length < 2) {
      this.hasSearched = false;
      this.users$ = of([]);
      return;
    }

    this.users$ = this.userService.searchUserNonFriends(searchValue);
    this.userItems$ = this.users$.pipe(
      map((users) =>
        users.map((u) => ({
          id: u.id,
          user: u,
        }))
      )
    );
  }

  searchFriends(searchValue: string) {
    this.friends$ = this.userService.searchUserFriends(searchValue);
    this.friendItems$ = this.friends$.pipe(
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
