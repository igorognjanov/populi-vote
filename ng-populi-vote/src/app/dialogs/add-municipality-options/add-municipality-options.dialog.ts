import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ElectionType } from '../../enum/election-type.enum';
import { ElectoralDistrictService } from '../../service/electoral-district.service';
import { MunicipalityService } from '../../service/municipality.service';
import { OptionResponse } from '../../interface/option-response.interface';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';

@Component({
  templateUrl: './add-municipality-options.dialog.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatLabel,
    MatInput,
    MatButton,
    MatIcon,
    MatMiniFabButton,
    MatFormFieldModule,
    MatOption,
    MatSelect
  ],
  styleUrls: ['./add-municipality-options.dialog.scss']
})
export class AddMunicipalityOptionsDialog implements OnInit {

  form!: FormGroup;
  canAddAndRemoveCandidates = false;
  electionType: ElectionType;
  selectedMunicipalityIds: number[];
  selectedElectoralDistrictIds: number[];
  municipalities: OptionResponse[] = [];
  electoralDistricts: OptionResponse[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {
      canAddAndRemoveCandidates: boolean,
      electionType: ElectionType
      selectedMunicipalityIds: number[],
      selectedElectoralDistrictIds: number[]
    },
    private matDialogRef: MatDialogRef<AddMunicipalityOptionsDialog>,
    private formBuilder: FormBuilder,
    private electoralDistrictService: ElectoralDistrictService,
    private municipalityService: MunicipalityService
  ) {
    this.canAddAndRemoveCandidates = data.canAddAndRemoveCandidates;
    this.electionType = data.electionType;
    this.selectedMunicipalityIds = data.selectedMunicipalityIds;
    this.selectedElectoralDistrictIds = data.selectedElectoralDistrictIds;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      options: this.formBuilder.array([]),
      municipalityId: [null],
      electoralDistrictId: [null]
    });

    if (this.electionType == ElectionType.MAYORAL) {
      this.municipalityService.findAllAsOptions().subscribe(
        all => this.municipalities = all
          .filter(it => !this.selectedMunicipalityIds.includes(it.id))
      );
    } else {
      this.electoralDistrictService.findAllAsOptions().subscribe(
        all => this.electoralDistricts = all
          .filter(it => !this.selectedElectoralDistrictIds.includes(it.id))
      );
    }

    this.addOption();
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
      // municipalityId: municipalityId,
      // electoralDistrictId: electoralDistrictId
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

  onSubmit() {
    this.matDialogRef.close(this.form.value);
  }

  protected readonly ElectionType = ElectionType;
}
