namespace ccalummiwebsite {

    angular.module('ccalummiwebsite', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('account', {
                url: '/account',
                templateUrl: '/ngApp/views/account/account.html',
                controller: ccalummiwebsite.Controllers.AccountController,
                controllerAs: 'vm'
            })
            .state('account.timeline', {
                // url: '/account/about',
                templateUrl: '/ngApp/views/account/account.timeline.html',
                controller: ccalummiwebsite.Controllers.AccountController,
                controllerAs: 'vm',

            })
            .state('account.about', {
                templateUrl: '/ngApp/views/account/account.about.html',
                controller: ccalummiwebsite.Controllers.AccountAboutController,
                controllerAs: 'vm',

            })
            .state('account.photo', {
                templateUrl: '/ngApp/views/account/account.photo.html',
                controller: ccalummiwebsite.Controllers.AccountPhotoController,
                controllerAs: 'vm',

            })
            .state('account.checkin', {
                templateUrl: '/ngApp/views/account/account.checkin.html',
                controller: ccalummiwebsite.Controllers.AccountCheckinController,
                controllerAs: 'vm',

            })
            .state('account.about.detailEdit', {
                templateUrl: '/ngApp/views/about/about.detailEdit.html',
                controller: ccalummiwebsite.Controllers.AccountAboutDetailEditController,
                controllerAs: 'vm',

            })
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: ccalummiwebsite.Controllers.HomeController,
                controllerAs: 'controller'
            })

            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: ccalummiwebsite.Controllers.LoginController,
                controllerAs: 'vm'
            })
            .state('inbox', {
                url: '/inbox',
                templateUrl: '/ngApp/views/inbox.html',
                controller: ccalummiwebsite.Controllers.MessageController,
                controllerAs: 'vm'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
