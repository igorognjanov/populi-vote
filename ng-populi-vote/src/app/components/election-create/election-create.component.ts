import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ElectionService } from '../../service/election.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionResponse } from '../../interface/option-response.interface';
import { ElectoralDistrictService } from '../../service/electoral-district.service';
import { MunicipalityService } from '../../service/municipality.service';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDatepicker, MatDatepickerInput, MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRipple } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';


@Component({
  selector: 'election-create-edit',
  templateUrl: './election-create.component.html',
  styleUrls: ['./election-create.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage, MatLabel, MatSelect, MatFormField, MatOption,
            MatIconModule, MatButtonModule, MatInput, MatNativeDateModule, MatRipple,
            MatDatepickerToggle, MatDatepicker, MatDatepickerInput,
            MatFormFieldModule,
            MatInputModule, NgxMatTimepickerModule]
})
export class ElectionCreateComponent implements OnInit {
  form!: FormGroup;
  editable = true;
  electionId: number | null = null;
  electionTypes: OptionResponse[] = [];
  electoralDistricts: OptionResponse[] = [];
  municipalities: OptionResponse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private electionService: ElectionService,
    private route: ActivatedRoute,
    private router: Router,
    private electoralDistrictService: ElectoralDistrictService,
    private municipalityService: MunicipalityService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      type: [null, Validators.required],
      options: this.formBuilder.array([]),
      municipalityIds: [[], Validators.required],
      electoralDistrictIds: [[]]
    });

    this.electionService.getElectionTypes().subscribe(electionTypes => this.electionTypes = electionTypes);
    this.electoralDistrictService.findAllAsOptions().subscribe(
      electoralDistricts => this.electoralDistricts = electoralDistricts);
    this.municipalityService.findAllAsOptions().subscribe(municipalities => this.municipalities = municipalities);

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editable = false;
        this.form.disable();
        this.electionId = +id;
        this.form.get('id')?.setValue(this.electionId);
        this.electionService.findById(this.electionId).subscribe(election => {
          this.form.patchValue({
            title: election.title,
            description: election.description,
            startDate: election.startDate,
            endDate: election.endDate,
            type: election.type
          });
          const optionsArray = this.form.get('options') as FormArray;

          election.options.forEach(option => {
            optionsArray.push(this.formBuilder.group({
              title: [option.title],
              candidates: this.formBuilder.array(
                option.candidates.map(candidate => this.formBuilder.group({
                  name: [candidate.name],
                  position: [candidate.position]
                }))
              )
            }));
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const election = this.form.value;
    this.electionService.createOrUpdate(election).subscribe(() => {
      this.router.navigate(['/elections']);
    });
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  createCandidate(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      position: [''] // Optional field
    });
  }

  createOption(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      candidates: this.formBuilder.array([this.createCandidate()]) // Start with 1 candidate
    });
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  addCandidate(optionIndex: number): void {
    const candidates = (this.options.at(optionIndex).get('candidates') as FormArray);
    candidates.push(this.createCandidate());
  }

  removeCandidate(optionIndex: number, candidateIndex: number): void {
    const candidates = (this.options.at(optionIndex).get('candidates') as FormArray);
    candidates.removeAt(candidateIndex);
  }

  candidates(option: AbstractControl) {
    return option.get('candidates') as FormArray;
  }
}
