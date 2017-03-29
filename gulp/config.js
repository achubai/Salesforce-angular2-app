module.exports = {
    deploy: {
        username:       '',
        password:       '',
        login_url:      'https://test.salesforce.com',
        api_version:    39.0,
        timeout:        600000,
        poll_interval:  5000
    },

    visualforce: {
        template: 'index.page.html',
        page: 'AngularApp',
        controller: 'AngularAppController'
    },

    resources: {
        common: 'AngularCommonModule'
    },

    options: {

    }
};