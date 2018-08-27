import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { TokenUtilService } from '../services/token-util.service';
import { AuthResponse } from '../interfaces/AuthResponse';

@Component({
    selector: 'app-valet-login',
    templateUrl: '../templates/valet-login.component.html',
    styleUrls: ['../../styles/components/valet-login.component.scss']
})

export class ValetLoginComponent implements OnInit, OnDestroy {

    valet = {
        uname: null,
        pwd: null
    };

    constructor(private auth: AuthService,
        private tokenUtil: TokenUtilService,
        private router: Router) { }

    ngOnInit(): void { }
    ngOnDestroy(): void { }

    login(form) {
        this.auth.loginValet(form.value.uname, form.value.pwd)
            .subscribe((response: AuthResponse) => {
                if (response.auth) {
                    this.tokenUtil.setToken(response.token, 'token_v');
                    this.router.navigateByUrl(`valet/ticket`,
                        { skipLocationChange: false });
                }
            });
    }

}
