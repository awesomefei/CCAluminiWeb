namespace ccalummiwebsite.Contollers {
    class NavbarController {
        public loginInfo;
        public firstname;

        constructor(private loginService: ccalummiwebsite.Services.LoginService,
                    private $state: ng.ui.IStateService){
                        this.getFirstname();
        }

        getUsername(){
            return this.loginService.getUsername();
        }

        login(){
            this.loginService.login(this.loginInfo)

            .then(()=>{
                this.$state.go('home');
                (<HTMLFormElement>document.getElementById('loginForm')).reset()
            })
            .catch(()=>{
                alert('Login failed')
            })
        }

        logout(){
            this.loginService.logout();
            this.$state.go('login');
        }

        gotoAccount(){
            this.$state.go('account');
        }

        getFirstname(){
            this.firstname = this.loginService.getFirstname();
        }
    }
    angular.module('ccalummiwebsite').controller('navbarController', NavbarController);
}
