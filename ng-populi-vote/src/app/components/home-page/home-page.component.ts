import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../../service/election.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OngoingElection } from '../../interface/ongoing-election.interface';
import { KeycloakService } from '../../service/keycloak.service';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  ongoingElections: OngoingElection[] = [];
  keycloakService: KeycloakService

  constructor(private router: Router,
              private electionService: ElectionService,
              keycloakService: KeycloakService
  ) {
    this.keycloakService = keycloakService;
  }

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

  goToStats(electionId: number) {
    this.router.navigate([`/stats/${electionId}`]);
  }

  goToManualVoteAddingScreen(electionId: number) {
    this.router.navigate([`/physical-votes/${electionId}`]);
  }
}
