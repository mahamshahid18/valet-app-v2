import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { TokenUtilService } from '../services/token-util.service';

import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-ticket',
    templateUrl: '../templates/ticket-view.component.html',
    styleUrls: ['../../styles/components/ticket-view.component.scss']
})

export class TicketViewComponent implements OnInit, OnDestroy {

    user: any = {
        first_name: '',
        last_name: '',
        car: {
            reg_no: '',
            color: '',
            manufacturer: '',
            model: ''
        },
        ticket: {
            paid: '',
            amount: '',
            no: ''
        }
    };

    constructor(private auth: AuthService,
        private data: DataService,
        private tokenUtil: TokenUtilService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.tokenUtil.isTokenValid()
            .subscribe(() => {
                this.getData();
            });
    }

    ngOnDestroy(): void {
    }

    getData() {
        let ticket_no = null;
        this.route.params
            .pipe(
                switchMap(param => {
                    ticket_no = param.ticket_no;
                    return this.data.getUser(ticket_no, this.tokenUtil.getToken());
                })
            )
            .subscribe((response) => {
                this.user = response;
            });
    }

}
