import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, computed, input, model, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatIconButton } from '@angular/material/button';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { NoteSearchFilters } from '../../model/note/note-search-filters';
import { ViewSelectValue } from '../../model/view-select-value';

@Component({
  selector: 'app-note-search-bar',
  imports: [
    MatFormField,
    MatSuffix,
    MatIconButton,
    MatIcon,
    MatLabel,
    MatDatepickerModule,
    MatFormField,
    MatSelect,
    MatChipInput,
    MatAutocomplete,
    ReactiveFormsModule,
    MatInput,
    MatChipGrid,
    MatChipRow,
    MatOption,
    MatHint,
    MatAutocomplete,
    MatAutocompleteTrigger,
  ],
  templateUrl: './note-search-bar.html',
  styleUrl: './note-search-bar.css',
})
export class NoteSearchBar implements OnInit {
  gradeOptions: ViewSelectValue[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
    { value: 7, viewValue: '7' },
    { value: 8, viewValue: '8' },
    { value: 9, viewValue: '9' },
    { value: 10, viewValue: '10' },
  ];

  tags = signal<string[]>([]);
  allTagOptions = input<string[]>([]);

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentTag = model('');
  filteredTags = computed(() => {
    const currentTag = this.currentTag().toLowerCase();

    return this.allTagOptions()
      .filter((tag) => !this.tags().includes(tag))
      .filter((tag) => (currentTag ? tag.toLowerCase().includes(currentTag) : true));
  });

  searchForm!: FormGroup;

  searchEvent = output<NoteSearchFilters>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      title: new FormControl('', { nonNullable: true }),
      tag: new FormControl('', { nonNullable: true }),
      grade: new FormControl<number | null>(null),
      from: new FormControl<Date | null>(null),
      to: new FormControl<Date | null>(null),
    });
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags().includes(value)) {
      this.tags.update((tags) => [...tags, value]);
    }
    this.currentTag.set('');
  }

  removeTag(tag: string) {
    this.tags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }
      tags.splice(index, 1);

      return [...tags];
    });
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;

    if (value && !this.tags().includes(value)) {
      this.tags.update((tags) => [...tags, value]);
    }

    this.currentTag.set('');
    event.option.deselect();
  }

  onSubmit() {
    const value = this.searchForm.getRawValue();

    const filters: NoteSearchFilters = {
      title: value.title.trim() || undefined,
      tag: value.tag.trim() || undefined,
      grade: value.grade ?? undefined,
      from: value.from ?? undefined,
      to: value.to ?? undefined,
    };

    this.searchEvent.emit(filters);

    this.searchForm.reset();
    this.tags.set([]);
  }
}
