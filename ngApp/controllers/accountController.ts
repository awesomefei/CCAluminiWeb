namespace ccalummiwebsite.Controllers{
    export class AccountController{
        public imgUrl = "http://whatsappdp.net/wp-content/uploads/2016/03/Best-whatsapp-profile-picture.jpg";
        public message = 'hello from AccountController';
        public userAccount;
        private id;
        public file;

        constructor(
            private filepickerService,
            private $scope: ng.IScope,
            private $state:ng.ui.IStateService,
            private accountService: ccalummiwebsite.Services.AccountService,
         ){
             this.$state.go('account.timeline')
        //     this.gerUserAccount();
         }
         public pickFile() {

           this.filepickerService.pick(
               { mimetype: 'image/*' },
               this.fileUploaded.bind(this)
           );
       }
       public fileUploaded(file) {
           // console.log(file)
           this.file = file;
           this.imgUrl = file.url;
           this.accountService.updateimgUrlOnService(this.imgUrl)
           .then(() =>{
             this.$scope.$apply()
           })

        //    console.log(this.imgUrl);
           // force page to update
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
