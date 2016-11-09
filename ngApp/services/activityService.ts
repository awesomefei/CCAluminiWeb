namespace ccalummiwebsite.Services {
    export class ActivityService {
        public activityResources;

<<<<<<< HEAD
        constructor(private $resource: ng.resource.IResourceService){
=======
        constructor(
            private $resource: ng.resource.IResourceService){
>>>>>>> ProfileInfo
            this.activityResources = $resource('api/activities/:id', null, {
                addLike: {
                    method: "PUT",
                    // url: "/api/activities/:id"
                    params:{
                        id: "@id"
                    }
                },
                saveComment: {
                    method: "POST",
                    url: "/api/activities/saveComment/:id"
                }
            })
        }

        getActivities(){
            return this.activityResources.query();
        }

        getActivity(id){
            return this.activityResources.get({id: id});
        }

        saveActivity(message){
            return this.activityResources.save(message).$promise
        }

        addLike(id){
            return this.activityResources.addLike({id: id}).$promise
        }

        saveComment(actId, comment){
            return this.activityResources.saveComment({id: actId}, comment).$promise
        }
    }
    angular.module('ccalummiwebsite').service('activityService', ActivityService);
}
