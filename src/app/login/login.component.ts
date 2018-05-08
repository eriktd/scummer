import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    pageTitle = 'Log In';
    returnUrl: string;

    constructor(private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        /*//remove token when component created
        if(!this.isLoggedIn()){
            this.authService.logout();   
        }*/
        
        if(this.authService.isLoggedIn()) {
            this.router.navigate(['']);
        }
        
        //get return Url or /
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            let username = loginForm.form.value.email;
            let password = loginForm.form.value.password;
            
            this.authService.login(username, password)
                .subscribe(data => { 
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        console.log(error);
                        
                    });

            /**/
        };
    }
}
