import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { NgForOf, NgIf } from '@angular/common';
import { ElectionStatsService } from '../../service/election-stats.service';
import { ActivatedRoute } from '@angular/router';
import { OptionHelperService } from '../../helper/option-helper.service';
import { OptionResponse } from '../../interface/option-response.interface';
import { ElectoralDistrictService } from '../../service/electoral-district.service';
import { MunicipalityService } from '../../service/municipality.service';
import { OptionCandidates } from '../../interface/option-candidates.interface';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { OptionStatsResponse } from '../../interface/response/option-stats-response';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'election-stats',
  templateUrl: './election-stats.component.html',
  styleUrls: ['./election-stats.component.scss'],
  imports: [
    BaseChartDirective,
    NgIf,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule
  ],
  standalone: true
})
export class ElectionStatsComponent implements OnInit {
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Vote Distribution by Option'
      }
    },
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };
  public chartData = {
    labels: ['Candidate A', 'Candidate B'],
    datasets: [{ data: [123, 87] }]
  };

  municipalityVal: number | undefined;
  electoralDistrictVal: number | undefined;

  options: OptionStatsResponse[] = [];
  groupedOptions: OptionCandidates[] = [];
  municipalities: OptionResponse[] = [];
  electoralDistricts: OptionResponse[] = [];

  constructor(private electionStatsService: ElectionStatsService,
              private optionHelper: OptionHelperService,
              private electoralDistrictService: ElectoralDistrictService,
              private municipalityService: MunicipalityService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.electionStatsService.getAllOptionStatsForElectionId(id).subscribe(options => {
          this.options = options;
          this.groupedOptions = this.optionHelper.groupOptionsByLocation(options.map(it => it.option));
          const municipalityIds = this.groupedOptions.filter(
            optionCandidates => optionCandidates.municipalityId != null).map(
            optionCandidates => optionCandidates.municipalityId);
          const electoralDistrictIds = this.groupedOptions.filter(
            optionCandidates => optionCandidates.electoralDistrictId != null).map(
            optionCandidates => optionCandidates.electoralDistrictId);
          if (municipalityIds.length != 0) {
            this.municipalityService.findAllAsOptions().subscribe(
              it => {
                this.municipalities = it.filter(option => municipalityIds.includes(option.id));
                this.municipalityVal = this.municipalities[0].id;
                this.municipalityChanged(this.municipalityVal);
              });
          } else if (electoralDistrictIds.length != 0) {
            this.electoralDistrictService.findAllAsOptions().subscribe(
              it => {
                this.electoralDistricts = it.filter(option => electoralDistrictIds.includes(option.id));
                this.electoralDistrictVal = this.electoralDistricts[0].id;
                this.electoralDistrictChanged(this.electoralDistrictVal);
              });
          } else {
            this.chartData = {
              labels: this.options.map(it => it.option.title),
              datasets: [{ data: this.options.map(it => it.totalVotes) }]
            };
          }

        });
      }
    });
  }

  municipalityChanged(id: any) {
    const ops = this.groupedOptions.find(it => it.municipalityId === id)!!.options;
    const data = ops.map(it => this.options.find(stats => stats.option.id == it.id)!!.totalVotes);
    this.chartData = {
      labels: ops.map(it => it.title),
      datasets: [{ data: data }]
    };
  }

  electoralDistrictChanged(id: any) {
    const ops = this.groupedOptions.find(it => it.electoralDistrictId === id)!!.options;
    const data = ops.map(it => this.options.find(stats => stats.option.id == it.id)!!.totalVotes);
    this.chartData = {
      labels: ops.map(it => it.title),
      datasets: [{ data: data }]
    };
  }

}
