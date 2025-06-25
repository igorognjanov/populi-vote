import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ElectoralDistrictService } from '../../service/electoral-district.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'electoral-district-create',
  standalone: true,
  templateUrl: './electoral-district-create.component.html',
  styleUrls: ['./electoral-district-create.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ElectoralDistrictCreateComponent implements OnInit {
  form!: FormGroup;
  editable = true;

  constructor(
    private fb: FormBuilder,
    private districtService: ElectoralDistrictService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editable = false;
        this.form.disable();
        const electoralDistrictId = +id;
        this.form.get('id')?.setValue(electoralDistrictId);
        this.districtService.findById(electoralDistrictId).subscribe(electoralDistrict => {
          this.form.patchValue({
            name: electoralDistrict.name,
            code: electoralDistrict.code,
            description: electoralDistrict.description
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.districtService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/electoral-districts']);
    });
  }
}
