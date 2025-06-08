import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ElectionService } from '../../service/election.service';
import { Election } from '../../interface/election';

@Component({
  selector: 'election-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './elections-list.component.html',
  styleUrl: './elections-list.component.scss'
})
export class ElectionListComponent implements OnInit {
  elections: Election[] = [];

  constructor(private electionService: ElectionService) {}

  ngOnInit(): void {
    this.loadElections();
  }

  loadElections() {
    this.electionService.getElections().subscribe({
      next: (res) => (this.elections = res),
      error: (err) => console.error('Failed to load elections', err)
    });
  }

  deleteElection(id: number): void {
    if (confirm('Are you sure you want to delete this election?')) {
      this.electionService.deleteElection(id).subscribe(() => {
        this.loadElections(); // Refresh list
      });
    }
  }
}
