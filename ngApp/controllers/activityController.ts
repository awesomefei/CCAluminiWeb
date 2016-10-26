namespace ccalummiwebsite.Controllers {
    export class ActivityController {
        public userInfo;
        public activities;
        public activity;
        public message;
        public users;

        constructor(private activityService: ccalummiwebsite.Services.ActivityService,
                    private userService: ccalummiwebsite.Services.UserService,
                    private messageService: ccalummiwebsite.Services.MessageService){
            this.getActivities();
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

        saveMessage(id){
            this.messageService.saveMessage(id, this.message)
            .then(()=>{
                this.getActivities();
            }).catch(()=>{
                console.log('Message not saved')
            })
        }

        addLike(id){
            console.log(id)
            this.activityService.addLike(id)
            .then(()=>{
                this.getActivities()
            }).catch(()=>{
                console.log('Liking post was unsuccesfull')
            })
        }
    }
}
