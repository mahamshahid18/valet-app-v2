import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from '../components/app.component';
import { ValetLoginComponent } from '../components/valet-login.component';
import { UserLoginComponent } from '../components/user-login.component';
import { PaymentComponent } from '../components/payment.component';
import { TicketCreationComponent } from '../components/ticket-creation.component';
import { TicketVerificationComponent } from '../components/ticket-verification.component';
import { TicketViewComponent } from '../components/ticket-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ValetLoginComponent,
    UserLoginComponent,
    PaymentComponent,
    TicketCreationComponent,
    TicketVerificationComponent,
    TicketViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
