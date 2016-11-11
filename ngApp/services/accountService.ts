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
                },
                getAccountInfo:{
                    method:'GET',
                    url:'/api/users/user'

                },
                editDetailsAboutUser:{
                    method:"PUT",
                    url:'/api/users/detail'
                },
                editWork:{
                    method:'PUT',
                    url:'/api/users/work'
                },
                editEducation:{
                    method:'PUT',
                    url:'/api/users/education'
                }

            });
        }
        getAccountOnService(){
            return this.accountResource.getAccountInfo();
        }
        updateimgUrlOnService(imageUrl){
            return this.accountResource.changeImgUrl({profileImageUrl:imageUrl}).$promise;

        }
        editDetailsAboutUserOnService(detailsAboutUser){
            return this.accountResource.editDetailsAboutUser({detailsAboutUser:detailsAboutUser}).$promise;
        }

        editWorkOnService(workingExperience){
            return this.accountResource.editWork({workingExperience: workingExperience}).$promise;

        }
        editEducationOnService(education){
            console.log('!!!!!!!!!!!!!editEdicationOnService' + education);
            return this.accountResource.editEducation({education: education}).$promise;

        }

    }

    angular.module('ccalummiwebsite').service('accountService', AccountService);
}
