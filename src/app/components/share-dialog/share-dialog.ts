import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ViewAutocompleteValue } from '../../model/view-autocomplete-value';
import { SimpleAutocomplete } from '../simple-autocomplete/simple-autocomplete';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-share-dialog',
  imports: [MatDialogModule, SimpleAutocomplete, MatButton],
  templateUrl: './share-dialog.html',
  styleUrl: './share-dialog.css',
})
export class ShareDialog {
  data = inject<ViewAutocompleteValue[]>(MAT_DIALOG_DATA);
  selectedUser = '';

  constructor(private dialogRef: MatDialogRef<ShareDialog>) {}

  onUserSelected(selectedValue: string) {
    this.selectedUser = selectedValue;
  }

  onShare() {
    this.dialogRef.close(this.selectedUser);
  }
}
