namespace ccalummiwebsite.Services {
    export class UserService {
        public userResources;

        constructor(private $resource:ng.resource.IResourceService){
            this.userResources = $resource('/api/users/:id'), null, {
                getUser: {
                    method: "GET",
                    url: "/api/users/user"
                }
            }
        }

        getUsersOnService(){
            return this.userResources.query();
        }

        getUser(){
            return this.userResources.getUser();
        }

        getaUser(id){
            return this.userResources.get({id: id});
        }
    }
    angular.module('ccalummiwebsite').service('userService', UserService);
}
