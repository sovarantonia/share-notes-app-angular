import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { ViewAutocompleteValue } from '../../model/view-autocomplete-value';

@Component({
  selector: 'app-simple-autocomplete',
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatInputModule, AsyncPipe],
  templateUrl: './simple-autocomplete.html',
  styleUrl: './simple-autocomplete.css',
})
export class SimpleAutocomplete implements OnChanges {
  @Input() options: ViewAutocompleteValue[] = [];
  control = new FormControl('', { nonNullable: true });
  filteredOptions!: Observable<ViewAutocompleteValue[]>;

  @Output() optionSelected = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(this.control.value || ''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): ViewAutocompleteValue[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.viewValue.toLowerCase().includes(filterValue));
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;

    this.optionSelected.emit(selectedValue);
  }
}
