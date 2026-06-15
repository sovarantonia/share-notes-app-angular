import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TagResponse } from "../../model/tag/tag-response";

@Injectable({providedIn: 'root'})
export class TagService {
    private readonly baseUrl = `${environment.baseUrl}/tags`;
    private http: HttpClient = inject(HttpClient);

    getTagsForUser(): Observable<TagResponse[]> {
        return this.http.get<TagResponse[]>(this.baseUrl);
    }
}
