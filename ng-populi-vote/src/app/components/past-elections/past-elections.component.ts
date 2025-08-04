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
  templateUrl: './past-elections.component.html',
  styleUrls: ['./past-elections.component.scss']
})
export class PastElectionsComponent implements OnInit {
  pastElections: OngoingElection[] = [];
  keycloakService: KeycloakService

  constructor(private router: Router,
              private electionService: ElectionService,
              keycloakService: KeycloakService
  ) {
    this.keycloakService = keycloakService;
  }

  ngOnInit(): void {
    this.electionService.getPastElections().subscribe({
      next: (elections) => {
        this.pastElections = elections;
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
