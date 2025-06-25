import { Component, OnInit } from '@angular/core';
import { MunicipalityService } from '../../service/municipality.service';
import { MunicipalityResponse } from '../../interface/response/municipality-response.interface';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'municipality-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './municipality-list.component.html',
  styleUrls: ['./municipality-list.component.scss']
})
export class MunicipalityListComponent implements OnInit {
  municipalities: MunicipalityResponse[] = [];
  displayedColumns: string[] = ['name', 'electoralDistrict', 'actions'];

  constructor(private municipalityService: MunicipalityService) {}

  ngOnInit(): void {
    this.loadMunicipalities();
  }

  loadMunicipalities(): void {
    this.municipalityService.findAll().subscribe({
      next: (res) => (this.municipalities = res),
      error: (err) => console.error('Failed to load municipalities', err),
    });
  }

  deleteMunicipality(id: number): void {
    if (confirm('Are you sure you want to delete this municipality?')) {
      this.municipalityService.delete(id).subscribe(() => {
        this.loadMunicipalities();
      });
    }
  }
}
