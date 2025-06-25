import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../../service/election.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VoteService } from '../../service/vote.service';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  ongoingElections: any = [];

  constructor(private router: Router,
              private electionService: ElectionService,
              private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.electionService.getOngoingElections().subscribe({
      next: (elections) => {
        this.ongoingElections = elections;
      },
      error: (err) => console.error('Failed to load elections', err)
    });

  }

  goToVote(electionId: number) {
    this.router.navigate([`/vote/${electionId}`]);
  }
}
