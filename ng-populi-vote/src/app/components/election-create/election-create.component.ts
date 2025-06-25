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
import { ElectionType } from '../../enum/election-type.enum';

@Component({
  selector: 'election-create-edit',
  templateUrl: './election-create.component.html',
  styleUrls: ['./election-create.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage, MatLabel, MatSelect, MatFormField, MatOption,
            MatIconModule, MatButtonModule, MatInput, MatNativeDateModule, MatRipple,
            MatDatepickerToggle, MatDatepicker, MatDatepickerInput,
            MatFormFieldModule,
            MatInputModule]
})
export class ElectionCreateComponent implements OnInit {
  form!: FormGroup;
  editable = true;
  electionId: number | null = null;
  electionTypes: OptionResponse[] = [];
  electoralDistricts: OptionResponse[] = [];
  municipalities: OptionResponse[] = [];
  showMunicipalities = false;
  showElectoralDistricts = false;
  canAddAndRemoveCandidates = false;
  canAddOption = false;

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
      endTime: ['', Validators.required],
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
        (this.form.get('options') as FormArray);
        this.electionId = +id;
        this.form.get('id')?.setValue(this.electionId);
        this.electionService.findById(this.electionId).subscribe(election => {
          this.form.patchValue({
            title: election.title,
            description: election.description,
            startDate: election.startDate,
            endDate: election.endDate,
            type: election.type,
            electoralDistrictIds: election.electoralDistrictIds,
            municipalityIds: election.municipalityIds
          });
          const optionsArray = this.form.get('options') as FormArray;

          election.options.forEach(option => {
            const form = this.formBuilder.group({
              title: [option.title],
              candidates: this.formBuilder.array(
                option.candidates.map(candidate => {

                  const form = this.formBuilder.group({
                    name: [candidate.name],
                    position: [candidate.position]
                  });
                  if (!this.editable) {
                    form.disable();
                  }
                  return form;
                })
              )
            });
            if (!this.editable) {
              form.disable();
            }
            optionsArray.push(form);
          });
        });
      }
    });

    const startDateControl = this.form.get('startDate');
    const endDateControl = this.form.get('endDate');
    console.log(this.form.get('startTime'));
    this.form.get('startTime')?.valueChanges.subscribe(time => {
      const startDate = startDateControl?.value;
      if (startDate != null) {
        startDateControl?.setValue(this.setTimeOnDate(startDate, time));
      }
    });
    this.form.get('endTime')?.valueChanges.subscribe(time => {
      const endDate = endDateControl?.value;
      if (endDate != null) {
        endDateControl?.setValue(this.setTimeOnDate(endDate, time));
      }
    });

    this.form.get('type')?.valueChanges.subscribe(type => {
      this.canAddOption = true;
      this.form.get('electoralDistrictIds')?.setValue([]);
      this.form.setControl('options', new FormArray([]));
      switch (type) {
        case ElectionType.MAYORAL:
        case ElectionType.REFERENDUM:
        case ElectionType.PRESIDENTIAL: {
          this.showMunicipalities = true;
          this.showElectoralDistricts = false;
          this.canAddAndRemoveCandidates = false;
          break;
        }
        case ElectionType.PARLIAMENTARY: {
          this.showMunicipalities = false;
          this.showElectoralDistricts = true;
          this.canAddAndRemoveCandidates = true;
        }
      }
      if (type == ElectionType.REFERENDUM) {
        this.options.controls.forEach(group => {
          const candidates = (group as FormGroup).get('candidates') as FormArray;
          candidates.controls.forEach(candidateGroup => {
            const control = candidateGroup.get('name');
            control?.clearValidators();
            control?.updateValueAndValidity();
          });
        });
      } else {
        this.options.controls.forEach(group => {
          const candidates = (group as FormGroup).get('candidates') as FormArray;
          candidates.controls.forEach(candidateGroup => {
            const control = candidateGroup.get('name');
            control?.setValidators([Validators.required]);
            control?.updateValueAndValidity();
          });
        });
      }

      if (this.editable) {
        this.addOption();
      }
    });

    // this.form.valueChanges.subscribe(form => {
    //   this.logInvalidControls(this.form);
    // })
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
      name: [''],
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

  private setTimeOnDate(date: Date, timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes, 0, 0); // sets hrs, mins, secs, ms
    return updatedDate;
  }

  // logInvalidControls(formGroup: FormGroup | FormArray, path: string = ''): void {
  //   Object.entries(formGroup.controls).forEach(([key, control]) => {
  //     const currentPath = path ? `${path}.${key}` : key;
  //
  //     if (control instanceof FormGroup || control instanceof FormArray) {
  //       this.logInvalidControls(control, currentPath);
  //     } else if (control.invalid) {
  //       console.warn(`Invalid control: ${currentPath}`, control.errors);
  //     }
  //   });
  // }
}
