import { Component, Input } from '@angular/core';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { ShareResponse } from '../../model/share/share-response';
import { MatLabel } from "@angular/material/form-field";
import { MatChip } from "@angular/material/chips";
import { NotesCard } from "../notes-card/notes-card";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-share-card',
  imports: [MatCard, MatCardHeader, MatLabel, MatChip, NotesCard, DatePipe],
  templateUrl: './share-card.html',
  styleUrl: './share-card.css',
})
export class ShareCard {
  @Input() share!: ShareResponse;
  @Input() isReceived: boolean = true;
}
