namespace ccalummiwebsite.Services {
    export class UserService {
        public userResources;

        constructor(private $resource:ng.resource.IResourceService){
            this.userResources = $resource('api/users/:id')
        }

        getUsers(){
            return this.userResources.query();
        }
    }
    angular.module('ccalummiwebsite').service('userService', UserService);
}
