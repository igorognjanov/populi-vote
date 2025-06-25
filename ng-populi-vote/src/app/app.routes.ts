import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ElectionCreateComponent } from './components/election-create/election-create.component';
import { ElectoralDistrictListComponent } from './components/electoral-district-list/electoral-district-list.component';
import { MunicipalityListComponent } from './components/municipality-list/municipality-list.component';
import { MunicipalityCreateComponent } from './components/municipality-create/municipality-create.component';
import { ElectionListComponent } from './components/election-list/election-list.component';
import {
  ElectoralDistrictCreateComponent
} from './components/electoral-district-create/electoral-district-create.component';
import { PollingStationListComponent } from './components/polling-station-list/polling-station-list.component';
import { PollingStationCreateComponent } from './components/polling-station-create/polling-station-create.component';
import { VotingComponent } from './components/vote/vote.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home'
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home'
  },
  { path: 'elections/create', component: ElectionCreateComponent },
  { path: 'elections/:id', component: ElectionCreateComponent },
  { path: 'elections', component: ElectionListComponent },
  { path: 'electoral-districts', component: ElectoralDistrictListComponent },
  { path: 'electoral-districts/create', component: ElectoralDistrictCreateComponent },
  { path: 'electoral-districts/:id', component: ElectoralDistrictCreateComponent },
  { path: 'municipalities', component: MunicipalityListComponent },
  { path: 'municipalities/create', component: MunicipalityCreateComponent },
  { path: 'municipalities/:id', component: MunicipalityCreateComponent },
  { path: 'polling-stations', component: PollingStationListComponent },
  { path: 'polling-stations/create', component: PollingStationCreateComponent },
  { path: 'polling-stations/:id', component: PollingStationCreateComponent },
  { path: 'vote/:id', component: VotingComponent }
];
