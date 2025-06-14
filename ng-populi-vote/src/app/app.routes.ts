import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ElectionCreateEditComponent } from './components/election-create-edit/election-create-edit.component';
import { ElectionListComponent } from './components/elections-list/elections-list.component';
import { ElectoralDistrictListComponent } from './components/electoral-district-list/electoral-district-list.component';
import {
  ElectoralDistrictCreateComponent
} from './components/create-electoral-district/create-electoral-district.component';

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
  { path: 'elections/create', component: ElectionCreateEditComponent },
  { path: 'elections/:id', component: ElectionCreateEditComponent },
  { path: 'elections', component: ElectionListComponent },
  { path: 'electoral-districts', component: ElectoralDistrictListComponent },
  { path: 'electoral-districts/create', component: ElectoralDistrictCreateComponent },
  { path: 'electoral-districts/:id', component: ElectoralDistrictCreateComponent }
];
