import { NoteResponse } from "./note/note-response";

export interface NoteDialogData {
    note: NoteResponse,
    isReadonlyMode: boolean;
}
