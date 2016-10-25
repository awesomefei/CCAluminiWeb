namespace ccalummiwebsite.Controllers {
    export class ActivityController {
        public user;
        public activities;
        public activity;

        constructor(private activityService: ccalummiwebsite.Services.ActivityService,
                    private userService: ccalummiwebsite.Services.UserService,
                    private messageService: ){
            this.getActivities();
            this.getUser();
        }

        getActivities(){
            this.activities = this.activityService.getActivities();
        }

        saveActivity(){
            this.activity = this.activityService.saveActivity(this.activity)
            .then(()=>{
                this.getActivities();
            }).catch(()=>{
                console.log('Your post was unsuccesfull')
            })
        }

        getUser(){
            this.user = this.userService.getUser();
        }
    }
}
