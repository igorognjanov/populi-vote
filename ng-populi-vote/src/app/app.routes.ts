import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ElectionCreateEditComponent } from './components/election-create-edit/election-create-edit.component';
import { ElectionListComponent } from './components/elections-list/elections-list.component';

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
  { path: 'elections/edit/:id', component: ElectionCreateEditComponent },
  { path: 'elections', component: ElectionListComponent }
];
