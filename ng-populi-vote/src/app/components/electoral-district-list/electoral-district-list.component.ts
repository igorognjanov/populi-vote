import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectoralDistrictService } from '../../service/electoral-district.service';
import { ElectoralDistrict } from '../../interface/electoral-district.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'electoral-district-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './electoral-district-list.component.html',
  styleUrls: ['./electoral-district-list.component.scss']
})
export class ElectoralDistrictListComponent implements OnInit {
  districts: ElectoralDistrict[] = [];

  constructor(private districtService: ElectoralDistrictService) {}

  ngOnInit(): void {
    this.loadDistricts();
  }

  loadDistricts(): void {
    this.districtService.findAll().subscribe({
      next: (res) => (this.districts = res),
      error: (err) => console.error('Failed to load districts', err)
    });
  }

  deleteDistrict(id: number): void {
    if (confirm('Are you sure you want to delete this electoral district?')) {
      this.districtService.delete(id).subscribe(() => this.loadDistricts());
    }
  }
}
