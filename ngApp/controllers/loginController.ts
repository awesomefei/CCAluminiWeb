namespace ccalummiwebsite.Controllers {
    export class LoginController {
        public loginInfo;
        private user;

        constructor(private loginService: ccalummiwebsite.Services.LoginService,
                    private $state: ng.ui.IStateService){

        }



        saveUser(){
            this.loginService.saveUser(this.user)
            .then(()=>{
                this.$state.go('home')
            })
            .catch(()=>{
                console.log('something went wrong')
            })
        }
    }
}
