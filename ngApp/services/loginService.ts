namespace ccalummiwebsite.Services {
    export class LoginService {
        public userResource;

        constructor(private $http: ng.IHttpService,
                    private $window: ng.IWindowService,
                    private $q: ng.IQService,
                    private $resource: ng.resource.IResourceService){
                        this.userResource = $resource('/api/users/:id')
                    }

        login(loginInfo){
            return this.$q((resolve,reject)=>{

                this.$http
                .post('/api/users/login', loginInfo)
                .then((data:any)=>{
                    console.log('login loginInfor '+data.data.username);
                    let token = data.data.token;
                    let admin = data.data.admin;
                    let username = data.data.username;
                    let firstname = data.data.firstname;

                    this.$window.localStorage.setItem('token', token);
                    this.$window.localStorage.setItem('username', username);
                    this.$window.localStorage.setItem('admin', admin);
                    this.$window.localStorage.setItem('firstname', firstname);

                    resolve()
                })
                .catch((err)=>{
                    reject(err)
                })
            });
        }

        logout(){
            this.$window.localStorage.removeItem('token');
            this.$window.localStorage.removeItem('username');
            this.$window.localStorage.removeItem('admin');
            this.$window.localStorage.removeItem('firstname');
            this.$window.localStorage.removeItem('email');
        }

        saveUser(user){
            return this.$q((resolve,reject)=>{

                this.$http
                .post('/api/users/register', user)
                .then((data:any)=>{

                    let token = data.data.token;
                    let admin = data.data.admin;
                    let username = data.data.username;
                    let firstname = data.data.firstname;

                    this.$window.localStorage.setItem('token', token);
                    this.$window.localStorage.setItem('username', username);
                    this.$window.localStorage.setItem('admin', admin);
                    this.$window.localStorage.setItem('firstname', firstname);

                    resolve()
                })
                .catch((err)=>{
                    reject(err)
                })
            })
        }

        isAdmin(){
            return this.$window.localStorage.getItem('admin');
        }

        getUsername(){
            return this.$window.localStorage.getItem('username')
        }

        getFirstname(){
            return this.$window.localStorage.getItem('firstname')
        }
    }
    angular.module('ccalummiwebsite').service('loginService', LoginService)
}
