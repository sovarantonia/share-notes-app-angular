import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { map, Observable } from 'rxjs';
import { Dialog } from '../components/dialog/dialog';
import { FriendsCard } from '../components/friends-card/friends-card';
import { SnackbarService } from '../components/notification/snackbar-service';
import { DialogData } from '../model/dialog-data';
import { RequestResponse } from '../model/request/request-response';
import { UserCardItem } from '../model/user-card-item';
import { UserResponse } from '../model/user/user-response';
import { RequestService } from '../service/request/request-service';
import { UserService } from '../service/user/user-service';

@Component({
  selector: 'app-friends-page',
  imports: [MatTabsModule, FriendsCard],
  templateUrl: './friends-page.html',
  styleUrl: './friends-page.css',
})
export class FriendsPage implements OnInit {
  friends$!: Observable<UserResponse[]>;
  sentRequests$!: Observable<RequestResponse[]>;
  receivedRequests$!: Observable<RequestResponse[]>;

  friendsItems$!: Observable<UserCardItem[]>;
  sentRequestItems$!: Observable<UserCardItem[]>;
  receivedRequestItems$!: Observable<UserCardItem[]>;

  readonly dialog = inject(MatDialog);

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.friends$ = this.userService.getFriends();
    this.sentRequests$ = this.requestService.getSentRequests();
    this.receivedRequests$ = this.requestService.getReceivedRequests();

    this.friendsItems$ = this.friends$.pipe(
      map((friends) =>
        friends.map((f) => ({
          id: f.id,
          user: f,
        }))
      )
    );
    this.sentRequestItems$ = this.sentRequests$.pipe(
      map((requests) =>
        requests.map((r) => ({
          id: r.id,
          user: r.receiver,
          sentAt: r.sentAt,
        }))
      )
    );
    this.receivedRequestItems$ = this.receivedRequests$.pipe(
      map((requests) =>
        requests.map((r) => ({
          id: r.id,
          user: r.sender,
        }))
      )
    );
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
            this.friends$ = this.userService.getFriends();
            this.friendsItems$ = this.friends$.pipe(
              map((friends) =>
                friends.map((f) => ({
                  id: f.id,
                  user: f,
                }))
              )
            );
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
        this.friends$ = this.userService.getFriends();
        this.receivedRequests$ = this.requestService.getReceivedRequests();
        this.receivedRequestItems$ = this.receivedRequests$.pipe(
          map((requests) =>
            requests.map((r) => ({
              id: r.id,
              user: r.sender,
            }))
          )
        );
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
        this.receivedRequests$ = this.requestService.getReceivedRequests();
        this.receivedRequestItems$ = this.receivedRequests$.pipe(
          map((requests) =>
            requests.map((r) => ({
              id: r.id,
              user: r.sender,
            }))
          )
        );
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
      },
      error: () => {
        this.snackbarService.open('Could not delete the request');
      },
    });
  }
}
