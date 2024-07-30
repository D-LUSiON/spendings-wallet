import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'entries',
        loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesPageModule)
    },
    {
        path: 'accounts',
        loadChildren: () => import('./pages/accounts/accounts.module').then(m => m.AccountsPageModule)
    },
    {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
    },
    {
        path: 'statistics',
        loadChildren: () => import('./pages/statistics/statistics.module').then(m => m.StatisticsPageModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
    },
    {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
    },
    {
        path: 'error',
        loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorPageModule)
    },
    {
        path: '**',
        redirectTo: 'error'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
