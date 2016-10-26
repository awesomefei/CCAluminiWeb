namespace ccalummiwebsite.Services {
    export class ActivityService {
        public activityResources;

        constructor(private $resource: ng.resource.IResourceService){
            this.activityResources = $resource('api/activities', null, {
                addLike: {
                    method: "PUT",
                    url: "/api/activities/:id"
                }
            })
        }

        getActivities(){
            return this.activityResources.query();
        }

        saveActivity(message){
            return this.activityResources.save(message).$promise
        }

        addLike(id){
            return this.activityResources.addLike({id: id}).$promise
        }
    }
    angular.module('ccalummiwebsite').service('activityService', ActivityService);
}
