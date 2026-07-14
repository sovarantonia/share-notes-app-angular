import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ViewAutocompleteValue } from '../../model/view-autocomplete-value';
import { SimpleAutocomplete } from '../simple-autocomplete/simple-autocomplete';

@Component({
  selector: 'app-share-dialog',
  imports: [MatDialogModule, SimpleAutocomplete],
  templateUrl: './share-dialog.html',
  styleUrl: './share-dialog.css',
})
export class ShareDialog {
  data = inject<ViewAutocompleteValue[]>(MAT_DIALOG_DATA);
  selectedUser?: string;

  constructor(private dialogRef: MatDialogRef<ShareDialog>) {}

  onUserSelected(selectedValue: string) {
    this.selectedUser = selectedValue;
  }

  onShare() {
    this.dialogRef.close(this.selectedUser);
  }
}
