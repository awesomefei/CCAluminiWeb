namespace ccalummiwebsite.Controllers{
    export class AccountController{
        public imgUrl;
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
             this.getUserAccount();
             this.$state.go('account.timeline')
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
            this.getUserAccount();
           })
       }

        getUserAccount(){
            this.userAccount = this.accountService.getAccountOnService();
        }
    }
    export class AccountAboutController{
        public message = 'Hello from the account about page!';
        public userAccount;

        constructor(
            private accountService: ccalummiwebsite.Services.AccountService,
         ){
             this.getUserAccount();
         }
         getUserAccount(){
             this.userAccount = this.accountService.getAccountOnService();
         }

    }
    export class AccountAboutDetailEditController{
        public message = 'Hello from the detailEdit controller';
        public userAccount;
        public detailsAboutUser;

        constructor(
            private accountService: ccalummiwebsite.Services.AccountService,
            private $state:ng.ui.IStateService,

         ){
             this.getUserAccount();
         }
         getUserAccount(){
             this.userAccount = this.accountService.getAccountOnService();
         }
         editDetailsAboutUser(){
             this.accountService.editDetailsAboutUserOnService(this.detailsAboutUser)
             .then(() =>{
                  this.$state.go('account.timeline')
             })
         }
    }
    export class AccountPhotoController{
        public message = 'hello from the AccountPhotoController controler';
    }


    angular.module('ccalummiwebsite').factory('socket', function(){
        var io=require('./bin/www');
        var socket = io.connect('http://localhost:3000');

    })
    export class AccountCheckinController{
        public message = 'hello from the AccountCheckinController controler';
        public date = new Date();
        public userAccount;
        public messages = [];
        public msg;
        private io=require('./bin/www');
        private socket = this.io.connect('http://localhost:3000');

        constructor(
            private accountService: ccalummiwebsite.Services.AccountService,
            private $state:ng.ui.IStateService,
            private  $scope,

         ){
             this.getUserAccount();
         }
         getUserAccount(){
             this.userAccount = this.accountService.getAccountOnService();
         }
         sendMes(){
             this.socket.emit('send msg', this.msg.text);
             this.msg.text = '';
         }
         getMes(data){
             this.socket.on('get msg',)
             this.messages.push(data);
             this.$scope.$digest();

         }

    }
    export class EditworkandeducationController{
        public message = 'hello from the EditworkandeducationController controler';
        public work;
        public education;
        constructor(
            private accountService: ccalummiwebsite.Services.AccountService,
            private $state:ng.ui.IStateService,

         ){
         }
         editWork(){
             this.accountService.editWorkOnService(this.work)
             .then(() =>{
                 alert('Add work successfully')
             })
             .catch((err) =>{
                 console.log('Say something befor save' + err);
                 alert('Say something befor save');
             })

         }
         editEdication(){
             this.accountService.editEducationOnService(this.education)
             .then(() =>{
                 alert('Add education successfully')
             })
             .catch((err) =>{
                 alert('Say something befor save');
             })

         }

    }
    export class FriendsController{
        public message = 'hello from the FriendsController controler';
        public users;

        constructor(
            private userService: ccalummiwebsite.Services.UserService,
         ){
             this.getUsers();
         }
         getUsers(){
            this.users = this.userService.getUsersOnService();
         }

    }
}
