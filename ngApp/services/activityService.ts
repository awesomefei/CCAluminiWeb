namespace ccalummiwebsite.Services {
    export class ActivityService {
        public activityResources;

        constructor(private $resource: ng.resource.IResourceService){
            this.activityResources = $resource('api/activities')
        }

        getActivities(){
            return this.activityResources.query();
        }

        saveActivity(message){
            return this.activityResources.save(message).$promise
        }
    }
    angular.module('ccalummiwebsite').service('activityService', ActivityService);
}
