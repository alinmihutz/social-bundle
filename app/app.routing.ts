import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {LoginComponent} from "./components/login/login.component";
import {SocialBundleComponent} from "./components/socialbundle/social-bundle.component";
import {OAuthComponent} from "./components/oauth.component";
import {LogoutComponent} from "./components/logout/logout.component";

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'oauth',
        component: OAuthComponent
    },
     {
        path: 'socialbundle',
        component: SocialBundleComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
