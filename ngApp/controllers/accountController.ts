namespace ccalummiwebsite.Controllers{
    export class AccountController{
        public message = 'hello from AccountController';
        public userAccount;
        private id;

        constructor(
            private $state:ng.ui.IStateService
        //     private accountService: ccalummiwebsite.Services.AccountService,
         ){
             this.$state.go('account.timeline')
        //     this.gerUserAccount();
         }
        // gerUserAccount(){
        //     this.userAccount = this.accountService.getAccountOnService({id:this.id});
        // }
    }
    export class AccountAboutController{
        public message = 'Hello from the account about page!';

    }
    export class AccountAboutDetailEditController{
        public message = 'Hello from the detailEdit controller';
    }
    export class AccountPhotoController{
        public message = 'hello from the AccountPhotoController controler';
    }
    export class AccountCheckinController{
        public message = 'hello from the AccountCheckinController controler';

    }
}
