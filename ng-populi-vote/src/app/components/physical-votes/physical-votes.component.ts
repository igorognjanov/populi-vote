import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../../service/election.service';
import { Election } from '../../interface/election';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionCandidates } from '../../interface/option-candidates.interface';
import { OptionHelperService } from '../../helper/option-helper.service';
import { MatIcon } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import { ElectoralDistrictService } from '../../service/electoral-district.service';
import { MunicipalityService } from '../../service/municipality.service';
import { OptionResponse } from '../../interface/option-response.interface';
import {
  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { OptionRequest } from '../../interface/request/option-request.interface';
import { OptionService } from '../../service/option.service';

@Component({
  templateUrl: './physical-votes.component.html',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf,
    NgIf,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton
  ],
  styleUrls: ['./physical-votes.component.scss']
})
export class PhysicalVotesComponent implements OnInit {

  election: Election | undefined;
  optionCandidates: OptionCandidates[] = [];
  electoralDistricts: OptionResponse[] = [];
  municipalities: OptionResponse[] = [];
  form!: FormGroup;

  constructor(private electionService: ElectionService,
              private route: ActivatedRoute,
              private optionHelper: OptionHelperService,
              private electoralDistrictService: ElectoralDistrictService,
              private municipalityService: MunicipalityService,
              private formBuilder: FormBuilder,
              private router: Router,
              private optionService: OptionService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({});

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.electionService.findById(id).subscribe(election => {
        this.election = election;
        this.optionCandidates = this.optionHelper.groupOptionsByLocation(election.options);
        election.options.forEach(option => {
          this.form.addControl(`${option.id}`, new UntypedFormControl(option.numberOfPhysicalVotes));
        });
      });
    });

    this.electoralDistrictService.findAllAsOptions().subscribe(
      electoralDistricts => this.electoralDistricts = electoralDistricts);
    this.municipalityService.findAllAsOptions().subscribe(municipalities => this.municipalities = municipalities);
  }

  findMunicipality(id: number) {
    console.log('MUNI', id, this.municipalities);
    return this.municipalities.find(it => it.id === id);
  }

  findElectoralDistrict(id: number) {
    return this.electoralDistricts.find(it => it.id === id);
  }

  onSubmit() {
    const requests = Object.keys(this.form.controls).map(controlName => {
      const control = this.form.get(controlName);
      return { optionId: +controlName, numberOfPhysicalVotes: control?.value } as OptionRequest;
    });

    this.optionService.updateOptions(requests).subscribe({
      next: () => {
        this.router.navigate([`/home`]);
      }
    });

  }

}
