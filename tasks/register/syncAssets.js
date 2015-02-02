module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'sass:dev',
		'sync:dev',
    'coffee:dev',
    'spider_script:dev'
	]);
};
