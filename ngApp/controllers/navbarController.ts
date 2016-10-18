namespace ccalummiwebsite.Contollers {
    class NavbarController {
        public loginInfo;

        constructor(private loginService: ccalummiwebsite.Services.LoginService,
                    private $state: ng.ui.IStateService){

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
        }
    }
    angular.module('ccalummiwebsite').controller('navbarController', NavbarController);
}
