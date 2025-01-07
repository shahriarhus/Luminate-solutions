import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { PrivacyPolicyComponent } from './footer/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './footer/terms-conditions/terms-conditions.component';
import { CancellationPolicyComponent } from './footer/cancellation-policy/cancellation-policy.component';
import { RefundPolicyComponent } from './footer/refund-policy/refund-policy.component';
import { DisclaimerComponent } from './footer/disclaimer/disclaimer.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'navbar', component: NavbarComponent},
  {path: 'about', component: AboutComponent},
  {path: 'solutions', component: SolutionsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'privacy', component: PrivacyPolicyComponent},
 
  {path: 'terms&conditions', component: TermsConditionsComponent},
  {path: 'Disclaimer', component: DisclaimerComponent},
  {path: 'Refund Policy', component: RefundPolicyComponent},
  {path: 'Cancellation Policy', component: CancellationPolicyComponent},
  {path: 'quote', component: QuoteFormComponent},
  {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled', // Enables fragment scrolling
    scrollPositionRestoration: 'enabled', // Restores scroll position when navigating back
  }),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
