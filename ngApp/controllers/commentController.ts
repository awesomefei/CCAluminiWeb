namespace ccalummiwebsite.Controllers {
    export class CommentController {
        public activity;
        public comment;
        public user;

        constructor(private activityService: ccalummiwebsite.Services.ActivityService,
                    private userService: ccalummiwebsite.Services.UserService,
                    private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                    public activityId,
                    private $state:ng.ui.IStateService){
                        this.getActivity();
                        // this.getUser();
        }

        getActivity(){
            this.activity = this.activityService.getActivity(this.activityId);
        }

        getActivities(){
            this.activityService.getActivities();
        }

        saveComment(){
            this.activityService.saveComment(this.activity._id, this.comment)
            .then(()=>{
                this.$uibModalInstance.close();
                this.getActivities();
                this.$state.go('home');
            }).catch(()=>{
                console.log('Posting a comment was unsuccesfull')
            })
        }

        getUser(){
            this.user = this.userService.getUser();
        }

        cancelComment(){
            this.$uibModalInstance.close();
        }
    }
}
