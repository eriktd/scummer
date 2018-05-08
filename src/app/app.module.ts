import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { TaskInputComponent } from './task-input/task-input.component';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

import { TaskService } from './task.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';

import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    TaskInputComponent,
    BoardComponent,
    LoginComponent,
    MainComponent,
    WelcomeComponent,
    AboutComponent
  ],
  imports: [
    DragulaModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: 'welcome', component: WelcomeComponent },
        { path: 'login', component: LoginComponent },
        { path: 'board', component: BoardComponent, canActivate: [AuthGuardService] },
        { path: 'about', component: AboutComponent }
    ])
  ],
  providers: [TaskService, AuthGuardService, AuthService, 
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }],
  bootstrap: [MainComponent]
})
export class AppModule { }
