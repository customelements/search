var Lab = require('lab');
var lab = exports.lab = Lab.script();

var expect = require('chai').expect;
var server = require('../../../../server');

lab.experiment('List owner repositories', function() {
    lab.test('should return HTTP 200 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/robdodson'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('should return HTTP 404 status code', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/keppelen'
        };

        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    lab.test('should have all the required properties (bower)', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/robdodson'
        };

        server.inject(options, function(response) {
            expect(response.result[0]).to.have.all.keys([
                'id', 'name', 'description', 'owner', 'created_at', 'updated_at',
                'pushed_at', 'size', 'forks_count', 'open_issues_count',
                'stargazers_count', 'subscribers_count', 'default_branch',
                'homepage', 'has_issues',  'has_pages', 'bower'
            ]);

            expect(response.result[0].owner).to.have.all.keys([
                'id', 'login', 'avatar_url'
            ]);

            expect(response.result[0].bower).to.have.all.keys([
                'name', 'keywords', 'dependencies', 'homepage'
            ]);

            done();
        });
    });

    lab.test('should have all the required properties (npm)', function(done) {
        var options = {
            method: 'GET',
            url: '/repos/ruyadorno'
        };

        server.inject(options, function(response) {
            expect(response.result[0]).to.have.all.keys([
                'id', 'name', 'description', 'owner', 'created_at', 'updated_at',
                'pushed_at', 'size', 'forks_count', 'open_issues_count',
                'stargazers_count', 'subscribers_count', 'default_branch',
                'homepage', 'has_issues',  'has_pages', 'npm'
            ]);

            expect(response.result[0].owner).to.have.all.keys([
                'id', 'login', 'avatar_url'
            ]);

            expect(response.result[0].npm).to.have.all.keys([
                'name', 'keywords', 'dependencies', 'homepage'
            ]);

            done();
        });
    });
});
