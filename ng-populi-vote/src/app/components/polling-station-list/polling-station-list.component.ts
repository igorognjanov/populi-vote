import { Component, OnInit } from '@angular/core';
import { PollingStationService } from '../../service/polling-station.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PollingStationResponse } from '../../interface/response/polling-station-response.interface';

@Component({
  selector: 'polling-station-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './polling-station-list.component.html',
  styleUrls: ['./polling-station-list.component.scss']
})
export class PollingStationListComponent implements OnInit {
  pollingStations: PollingStationResponse[] = [];

  constructor(private pollingStationService: PollingStationService) {}

  ngOnInit(): void {
    this.loadPollingStations();
  }

  loadPollingStations(): void {
    this.pollingStationService.findAll().subscribe({
      next: (res) => this.pollingStations = res,
      error: (err) => console.error('Failed to load polling stations', err)
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
