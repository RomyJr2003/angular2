import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Account } from '@app/_models';

@Component({
    templateUrl: 'list.component.html',
    standalone: false
})
export class ListComponent implements OnInit {
    accounts: Account[];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.loadAccounts();
    }

    private loadAccounts() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => {
                this.accounts = accounts.map(account => ({
                    ...account,
                    status: account.status === 'Inactive' ? 'Inactive' : 'Active'
                }));
            });
    }
}