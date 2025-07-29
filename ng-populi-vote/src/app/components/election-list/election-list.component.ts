import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../../service/election.service';
import { Election } from '../../interface/election';

@Component({
  selector: 'election-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './election-list.component.html',
  styleUrl: './election-list.component.scss'
})
export class ElectionListComponent implements OnInit {
  elections: Election[] = [];
  displayedColumns: string[] = ['title', 'description', 'startDate', 'endDate', 'actions'];

  constructor(private electionService: ElectionService) {}

  ngOnInit(): void {
    this.loadElections();
  }

  loadElections() {
    this.electionService.getElections().subscribe({
      next: res => (this.elections = res),
      error: err => console.error('Failed to load elections', err)
    });
  }

  deleteElection(id: number): void {
    if (confirm('Are you sure you want to delete this election?')) {
      this.electionService.deleteElection(id).subscribe(() => this.loadElections());
    }
  }
}
