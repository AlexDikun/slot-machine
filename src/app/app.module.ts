import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SlotMachineComponent } from './main/slot-machine/slot-machine.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SlotMachineComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
