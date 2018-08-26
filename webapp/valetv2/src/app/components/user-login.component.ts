import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenUtilService } from '../services/token-util.service';
import { AuthResponse } from '../interfaces/AuthResponse';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: '../templates/user-login.component.html',
    styleUrls: ['../../styles/components/user-login.component.scss']
})

export class UserLoginComponent implements OnInit, OnDestroy {

    userModel = {
        ticket_no: null,
        phone: null,
        reg_no: null
    };
    subscription: Subscription;

    constructor(private auth: AuthService,
        private tokenUtil: TokenUtilService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((param) => {
            this.userModel.ticket_no = param.ticket_no;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    login(form) {
        this.subscription =
            this.auth.loginUser(
                this.userModel.ticket_no,
                form.value.phone,
                form.value.reg_no
            )
            .subscribe((response: AuthResponse) => {
                if (response.auth) {
                    this.tokenUtil.setToken(response.token);
                    this.router.navigateByUrl(`user/${this.userModel.ticket_no}`,
                        { skipLocationChange: false });
                }
            });
    }
}
