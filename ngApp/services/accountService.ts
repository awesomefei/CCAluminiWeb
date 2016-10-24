namespace ccalummiwebsite.Services{
    export class AccountService{
        private accountResource;
        constructor(
            private $resource:ng.resource.IResourceService,

        ){
            this.accountResource= this.$resource('/api/users,', null, {
                changeImgUrl:{
                    method:'PUT',
                    url:'/api/users/image'
                }
            });
        }
        getAccountOnService(id){

        }
        updateimgUrlOnService(imageUrl){
            console.log('$$$$$$$$$$$$updateimgUrlOnService');
            return this.accountResource.changeImgUrl({profileImageUrl:imageUrl}).$promise;

        }
    }
    angular.module('ccalummiwebsite').service('accountService', AccountService);
}
