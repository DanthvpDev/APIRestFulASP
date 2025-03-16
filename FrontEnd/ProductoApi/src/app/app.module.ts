import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ClientesModule } from './Clientes/clientes.module';
import { TrClienteComponent } from './Clienets/components/tr-cliente/tr-cliente.component';

@NgModule({
  declarations: [

    AppComponent,
<<<<<<< HEAD
    NavBarComponent,
    TrClienteComponent,

=======
    NavBarComponent
>>>>>>> 6a32a9af8a13cff27bbc5ff33d0c200842d954ed

  ],
  imports: [

    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ClientesModule

  ],
  providers: [

    provideHttpClient(withInterceptorsFromDi())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
