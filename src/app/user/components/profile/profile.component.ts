import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { GitService } from 'src/app/shared/git.service';
import { IUser } from './../../../shared/iuser';
import { IRepo } from './../../../shared/irepo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: IUser = {
    avatar_url: '',
    id: '',
    events_url: '',
    followers_url: '',
    gists_url: '',
    gravatar_id: '',
    html_url: '',
    organizations_url: '',
    starred_url: '',
    subscription_url: '',
    url: '',
    login: '',
    name: '',
    location: '',
    followers: 0,
    public_gists: 0,
    public_repos: 0,
    following: 0,
    bio: '',
    company: '',
    hireable: '',
    blog: '',
    created_at: '',
    updated_at: '',
  };
  followers: IUser[] = [];
  following: IUser[] = [];
  repos: IRepo[] = [];

  constructor(
    private route: ActivatedRoute,
    private gitService: GitService,
    private router: Router
  ) {
    this.checkRouter();
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    let userLogin = this.route.snapshot.paramMap.get('login');

    if (userLogin) {
      this.gitService.getUserDetails(userLogin).subscribe((res) => {
        this.userProfile = res;
      });
      this.getFollowers(userLogin);
      this.getFollowing(userLogin);
    }
  }

  getFollowers(username: string) {
    this.gitService.getFollowers(username).subscribe((res) => {
      this.followers = res;
    });
  }

  getFollowing(username: string) {
    this.gitService.getFollowers(username).subscribe((res) => {
      this.following = res;
    });
  }
  getRepos(username: string) {
    this.gitService.getRepos(username).subscribe((res) => {
      this.repos = res;
    });
  }

  checkRouter() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.getProfile();
      }
      if (event instanceof NavigationEnd) {
        this.getProfile();
      }
    });
  }
}
