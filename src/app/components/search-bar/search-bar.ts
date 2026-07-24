import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  searchEvent = output<string>();
  searchValue = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchValue.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => this.searchEvent.emit(value));
  }
}
