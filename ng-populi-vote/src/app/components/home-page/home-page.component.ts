import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TestService } from '../../service/test.service';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private testService: TestService) {
    this.testService.getTest().subscribe((res) => console.log('IGOR', res))
  }
}
