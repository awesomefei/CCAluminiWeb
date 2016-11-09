namespace ccalummiwebsite.Controllers {
    export class ActivityController {
        public userInfo;
        public activities;
        public activity;
        public message;
        public users;

        constructor(private activityService: ccalummiwebsite.Services.ActivityService,
                    private userService: ccalummiwebsite.Services.UserService,
                    private messageService: ccalummiwebsite.Services.MessageService,
                    private $uibModal: ng.ui.bootstrap.IModalService,
                    private $state:ng.ui.IStateService){
            this.getActivities();
        }

        getActivities(){
            this.activities = this.activityService.getActivities();
        }

        getActivityDetail(id){
            this.$uibModal.open({
                templateUrl: 'ngApp/views/comment.html',
                controller: ccalummiwebsite.Controllers.CommentController,
                controllerAs: 'vm',
                resolve: {
                    activityId: ()=>id,
                },
                size: "md"
            }).result.then(()=>{
                this.getActivities();
            })
        }

        saveActivity(){
            this.activity = this.activityService.saveActivity(this.activity)
            .then(()=>{
                this.getActivities();
            }).catch(()=>{
                console.log('Your post was unsuccesfull')
            })
        }

        saveMessage(id){
            this.messageService.saveMessage(id, this.message)
            .then(()=>{
                this.getActivities();
            }).catch(()=>{
                console.log('Message not saved')
            })
        }

        addLike(id){
            this.activityService.addLike(id)
            .then(()=>{
                this.getActivities()
            }).catch(()=>{
                console.log('Liking post was unsuccesfull')
            })
        }

        getaUser(userId){
            this.$state.go('user', {id:userId});
        }
    }
}
