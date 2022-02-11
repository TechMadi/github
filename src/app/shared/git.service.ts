import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { IUser } from './iuser';
import { IRepo } from './irepo';

@Injectable({
  providedIn: 'root',
})
export class GitService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.server_url}`);
  }
  getUserDetails(username: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.server_url}/${username}`);
  }

  getFollowers(username: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(
      `${environment.server_url}/${username}/followers`
    );
  }

  getFollowing(username: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(
      `${environment.server_url}/${username}/following`
    );
  }

  getRepos(username: string): Observable<IRepo[]> {
    return this.http.get<IRepo[]>(
      `${environment.server_url}/${username}/repos`
    );
  }
}
