let gulp = require('gulp'),
    archiver = require('gulp-archiver'),
    del = require('del'),
    forceDeploy = require('gulp-jsforce-deploy'),
    file = require('gulp-file'),
    rename = require('gulp-rename'),
    template = require('gulp-template'),
    config = require('./gulp/config'),
    pxml = require('pxml').PackageXML,
    resourceMetaXml = '<?xml version="1.0" encoding="UTF-8"?>' +
		'<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">' +
			'<cacheControl>Public</cacheControl>' +
			'<contentType>application/octet-stream</contentType>' +
		'</StaticResource>',
    pageMetaXml = '<?xml version="1.0" encoding="UTF-8"?> ' +
        '<ApexPage xmlns="http://soap.sforce.com/2006/04/metadata"> ' +
            '<apiVersion>' + config.deploy.api_version + '</apiVersion> ' +
            '<label>{0}</label> ' +
        '</ApexPage>',
    templateConfig = {
        common_modules: `{!URLFOR($Resource.${config.resources.common})}/`,
        baseUrl: '/apex/' + config.visualforce.page,
        title: 'Prod',
        controller: config.visualforce.controller
    };

gulp.task('clean', function () {
    return del(['.tmp', '.build']);
});

gulp.task('build:package-meta-xml', function (done) {
    let stream;

    Object.keys(config.resources).forEach(function (name) {
        stream = file(config.resources[name] + '.resource-meta.xml',
            resourceMetaXml, { src: true })
            .pipe(gulp.dest('.tmp/staticresources'));
    });

    stream.on('end', function() {
        //run some code here
        done();
    });
    stream.on('error', function(err) {
        done(err);
    });
});

gulp.task('build:html-meta-xml', function (done) {
    let stream = file(config.visualforce.page + '.page-meta.xml',
        pageMetaXml.replace("{0}", config.visualforce.page), { src: true })
        .pipe(gulp.dest('.tmp/pages'));

    stream.on('end', function() {
        //run some code here
        done();
    });
    stream.on('error', function(err) {
        done(err);
    });
});

gulp.task('build:resources', function (done) {
    let stream;

    Object.keys(config.resources).forEach(function (name) {
        stream = gulp.src('dist/**/*')
            .pipe(archiver(config.resources[name] + '.zip'))
            .pipe(rename({
                extname: '.resource'
            }))
            .pipe(gulp.dest('.tmp/staticresources'));
    });

    stream.on('end', function() {
        done();
    });
    stream.on('error', function(err) {
        done(err);
    });
});

gulp.task('build:pxml', function () {
    return file('package.xml', pxml.from_dir('.tmp').generate().to_string(), { src: true })
        .pipe(gulp.dest('.tmp'));
});

gulp.task('build:html', function (done) {
    let stream = gulp.src(`src/${config.visualforce.template}`)
        .pipe(rename(function (path) {
            path.basename = config.visualforce.page;
            path.extname = '.page';
        }))
        .pipe(template(templateConfig))
        .pipe(gulp.dest('.tmp/pages'));

    stream.on('end', function() {
        done();
    });
    stream.on('error', function(err) {
        done(err);
    });
});

gulp.task('build', gulp.series(
    'clean',
    'build:html',
    gulp.parallel('build:resources', 'build:package-meta-xml', 'build:html-meta-xml'),
    'build:pxml'
));

gulp.task('build:prod', gulp.series(
    'build'
));

gulp.task('deploy:jsforce', function () {
    return gulp.src('.tmp/**/*', { base: '.' })
        .pipe(archiver('pkg.zip'))
        .pipe(forceDeploy({
            username: config.deploy.username,
            password: config.deploy.password,
            loginUrl: config.deploy.login_url,
            version: config.deploy.api_version,
            checkOnly: process.env.CHECK_ONLY,
            pollTimeout: config.deploy.timeout,
            pollInterval: config.deploy.poll_interval
        }));
});

gulp.task('deploy:dev', gulp.series(
    'build',
    'deploy:jsforce'
));

