import { Component, OnInit } from '@angular/core';
import { PollingStationService } from '../../service/polling-station.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { PollingStationResponse } from '../../interface/response/polling-station-response.interface';

@Component({
  selector: 'polling-station-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './polling-station-list.component.html',
  styleUrls: ['./polling-station-list.component.scss']
})
export class PollingStationListComponent implements OnInit {
  pollingStations: PollingStationResponse[] = [];
  displayedColumns: string[] = ['name', 'code', 'address', 'municipality', 'actions'];

  constructor(private pollingStationService: PollingStationService) {}

  ngOnInit(): void {
    this.loadPollingStations();
  }

  loadPollingStations(): void {
    this.pollingStationService.findAll().subscribe({
      next: (res) => (this.pollingStations = res),
      error: (err) => console.error('Failed to load polling stations', err),
    });
  }

  deletePollingStation(id: number): void {
    if (confirm('Are you sure you want to delete this polling station?')) {
      this.pollingStationService.delete(id).subscribe(() => {
        this.loadPollingStations();
      });
    }
  }
}
