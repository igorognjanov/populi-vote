import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { ElectionService } from '../../service/election.service';
import { ActivatedRoute } from '@angular/router';
import { Election } from '../../interface/election';
import { VoteService } from '../../service/vote.service';

@Component({
  selector: 'app-voting',
  templateUrl: './vote.component.html',
  standalone: true,
  styleUrls: ['./vote.component.scss'],
  imports: [MatLabel,
            MatError,
            MatRadioGroup,
            MatRadioButton,
            MatButton,
            MatInput,
            ReactiveFormsModule,
            MatFormFieldModule]
})
export class VotingComponent implements OnInit {
  votingForm!: FormGroup;
  submitted = false;
  election: Election | undefined;

  constructor(private fb: FormBuilder,
              private electionService: ElectionService,
              private route: ActivatedRoute,
              private voteService: VoteService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.electionService.findByIdForVote(id).subscribe(election => this.election = election);
      this.voteService.hasUserVotedOnElection(id).subscribe(hasVoted => this.submitted = hasVoted);
    });
    this.votingForm = this.fb.group({
      selectedOption: ['', Validators.required]
    });

    this.votingForm.valueChanges.subscribe(val => console.log(val))
  }

  onSubmit(): void {
    if (this.votingForm.valid) {
      this.voteService.create(this.votingForm.get('selectedOption')?.value).subscribe({
        next: () => {
          this.submitted = true;
        },
        error: err => {
          console.log(err.errorMessage); // todo add toastr notification
        }
      });
    } else {
      this.votingForm.markAllAsTouched();
    }
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
