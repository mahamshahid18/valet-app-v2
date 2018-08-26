import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { TokenUtilService } from '../services/token-util.service';

import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-payment',
    templateUrl: '../templates/payment.component.html',
    styleUrls: ['../../styles/components/payment.component.scss']
})

export class PaymentComponent implements OnInit, OnDestroy {

    paymentDetails;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private data: DataService,
        private tokenUtil: TokenUtilService) { }

    ngOnDestroy(): void {
    }
    ngOnInit(): void {
        this.paymentDetails = {
            no: '',
            cvv: '',
            expiry: ''
        };
    }

    callPaymentApi(form) {
        console.log(form);
        let ticket_no = null;
        this.route.params
            .pipe(
                switchMap((param: any) => {
                    ticket_no = param.ticket_no;
                    return this.data.updatePaymentStatus(ticket_no, this.tokenUtil.getToken());
                })
            )
            .subscribe((response) => {
                form.reset();
                this.router.navigateByUrl('validate', { skipLocationChange: false });
            });
    }

}
