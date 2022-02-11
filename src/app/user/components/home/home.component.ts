import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GitService } from 'src/app/shared/git.service';
import { IUser } from './../../../shared/iuser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  githubForm: FormGroup = new FormGroup({});
  gitUser: { username: string } = { username: '' };
  users: IUser[] = [];
  filteredUser!: IUser;

  constructor(private gitService: GitService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.githubForm = this.fb.group({
      username: new FormControl(''),
    });

    this.getUsers();
  }

  submit() {
    this.gitUser = this.githubForm.getRawValue();
    this.getUserDetails(this.gitUser.username);
  }

  getUsers(): void {
    this.gitService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
  getUserDetails(username: string) {
    let user;
    this.gitService.getUserDetails(username).subscribe((res) => {
      this.filteredUser = res;
      this.users.length = 0;
      this.users.push(this.filteredUser);
    });
  }
}
