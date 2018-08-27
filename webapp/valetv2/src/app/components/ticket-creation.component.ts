import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../services/data.service';
import { TokenUtilService } from '../services/token-util.service';

@Component({
    selector: 'app-ticket-creation',
    templateUrl: '../templates/ticket-creation.component.html',
    styleUrls: ['../../styles/components/ticket-creation.component.scss']
})

export class TicketCreationComponent implements OnInit, OnDestroy {

    ticket = {
        firstName: null,
        lastName: null,
        phone: null,
        regNo: null,
        manufacturer: null,
        model: null,
        color: null
    };

    sub: Subscription;

    constructor(private data: DataService,
        private tokenUtil: TokenUtilService) { }

    ngOnInit(): void {
        this.sub =
            this.tokenUtil.isTokenValid(true, 'token_v')
            .subscribe();
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    generateTicket(form) {
        this.data.createTicket(form.value, this.tokenUtil.getToken('token_v'))
            .subscribe((result) => {
                console.log('Ticket Generated!');
                form.reset();
            });
    }

}
