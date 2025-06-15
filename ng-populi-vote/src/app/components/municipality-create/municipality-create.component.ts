import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MunicipalityService } from '../../service/municipality.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectoralDistrictService } from '../../service/electoral-district.service';
import { CommonModule } from '@angular/common';
import { OptionResponse } from '../../interface/option-response.interface';

@Component({
  selector: 'municipality-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './municipality-create.component.html',
  styleUrls: ['./municipality-create.component.scss']
})
export class MunicipalityCreateComponent implements OnInit {
  form!: FormGroup;
  districts: OptionResponse[] = [];
  editable = true;

  constructor(
    private formBuilder: FormBuilder,
    private municipalityService: MunicipalityService,
    private electoralDistrictService: ElectoralDistrictService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      electoralDistrictId: [null, Validators.required]
    });

    this.electoralDistrictService.findAllAsOptions().subscribe({
      next: res => this.districts = res,
      error: err => console.error('Failed to load districts', err)
    });


    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editable = false;
        this.form.disable();
        const municipalityId = +id;
        this.municipalityService.findById(municipalityId).subscribe(municipality => {
          this.districts = [municipality.electoralDistrict];
          this.form.patchValue({
            name: municipality.name,
            electoralDistrictId: municipality.electoralDistrict.id
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.municipalityService.save(this.form.value).subscribe(() => {
      this.router.navigate(['/municipalities']);
    });
  }
}
