import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  model,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  type MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { type MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoteRequest } from '../model/note/note-request';
import { ViewSelectValue } from '../model/view-select-value';
import { TagService } from '../service/tag/tag-service';
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
@Component({
  selector: 'app-note-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIcon,
    MatDatepicker,
    MatDatepickerModule,
  ],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm implements OnInit {
  noteForm!: FormGroup;

  @Input() formTitle!: string;
  @Input() isEditMode: boolean = false;

  @Output() formSubmitted = new EventEmitter<NoteRequest>();

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
  allTagOptions = signal<string[]>([]);

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentTag = model('');
  filteredTags = computed(() => {
    const currentTag = this.currentTag().toLowerCase();

    return currentTag
      ? this.allTagOptions().filter((tag) => tag.toLowerCase().includes(currentTag))
      : this.allTagOptions();
  });

  readonly today = new Date();

  constructor(
    private fb: FormBuilder,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      grade: new FormControl(1, [Validators.required]),
    });

    this.tagService.getTagsForUser().subscribe({
      next: (tags) => {
        this.allTagOptions.set(tags.map((t) => t.name));
      },
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
    this.tags.update((tags) => [...tags, event.option.viewValue]);
    this.currentTag.set('');
    event.option.deselect();
  }

  onSubmit() {
    if (this.noteForm.invalid) {
      return;
    }

    const formValue = this.noteForm.value;
    const note: NoteRequest = {
      title: formValue.title,
      text: formValue.text,
      date: formValue.date, 
      grade: formValue.grade,
      tags: this.tags(),
    };

    this.formSubmitted.emit(note);
  }
}
