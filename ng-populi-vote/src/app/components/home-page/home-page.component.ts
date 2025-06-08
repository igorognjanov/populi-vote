import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ElectionService } from '../../service/election.service';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private testService: ElectionService) {
    this.testService.getElections().subscribe((res) => console.log('IGOR', res))
  }
}
