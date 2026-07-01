import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { ShareCard } from '../components/share-card/share-card';
import { ShareResponse } from '../model/share/share-response';
import { ShareService } from '../service/share/share-service';

@Component({
  selector: 'app-shares-page',
  imports: [MatTabGroup, MatFormFieldModule, MatTabsModule, AsyncPipe, ShareCard],
  templateUrl: './shares-page.html',
  styleUrl: './shares-page.css',
})
export class SharesPage implements OnInit {
  sentNotes$!: Observable<ShareResponse[]>;
  receivedNotes$!: Observable<ShareResponse[]>;

  constructor(private shareService: ShareService) {}

  ngOnInit(): void {
    this.sentNotes$ = this.shareService.getSharedNotesWithUsers();
    this.receivedNotes$ = this.shareService.getReceivedNotesFromUsers();
  }
}
