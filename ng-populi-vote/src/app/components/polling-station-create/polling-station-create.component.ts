import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PollingStationService } from '../../service/polling-station.service';
import { MunicipalityService } from '../../service/municipality.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OptionResponse } from '../../interface/option-response.interface';

@Component({
  selector: 'polling-station-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './polling-station-create.component.html',
  styleUrls: ['./polling-station-create.component.scss']
})
export class PollingStationCreateComponent implements OnInit {
  form!: FormGroup;
  municipalities: OptionResponse[] = [];
  editable = true;

  constructor(
    private formBuilder: FormBuilder,
    private pollingStationService: PollingStationService,
    private municipalityService: MunicipalityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      municipalityId: [null, Validators.required]
    });

    this.municipalityService.findAllAsOptions().subscribe({
      next: (res) => (this.municipalities = res),
      error: (err) => console.error('Failed to load municipalities', err)
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editable = false;
        this.form.disable();
        const psId = +id;
        this.pollingStationService.findById(psId).subscribe(pollingStation => {
          this.municipalities = [pollingStation.municipality];
          this.form.patchValue({
            name: pollingStation.name,
            address: pollingStation.address,
            municipalityId: pollingStation.municipality.id
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.pollingStationService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/polling-stations']);
    });
  }
}
