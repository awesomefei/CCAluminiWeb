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
                templateUrl: '/ngApp/views/account.html',
                controller: ccalummiwebsite.Controllers.AccountController,
                controllerAs: 'vm'
            })
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: ccalummiwebsite.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: ccalummiwebsite.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: ccalummiwebsite.Controllers.LoginController,
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
