namespace ccalummiwebsite.Controllers {
    export class UserController {
        public user;
        private userId;

        constructor(private userService: ccalummiwebsite.Services.UserService,
                    private $stateParams:ng.ui.IStateParamsService,
                    private accountService: ccalummiwebsite.Services.AccountService){
                        let userId = this.$stateParams["id"];
                        this.getaUser();
                        console.log(this.userId);
                        console.log("Hi from this controller");
        }
        getaUser(){
            this.user = this.userService.getaUser(this.userId);
        }
    }
}
