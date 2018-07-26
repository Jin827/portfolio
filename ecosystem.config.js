module.exports = {
	apps : [{
		name      : 'portfolio',
		script    : 'production/server/index.js',
		instances: 'max',
		exec_mode: 'cluster',
		output: '/dev/null',
		error: '/dev/null',
		env: {
			NODE_ENV: 'development'
		},
		env_production : {
			NODE_ENV: 'production'
		}
	}],

	deploy : {
		production : {
			user : 'node',
			host : '212.83.163.1',
			ref  : 'origin/master',
			repo : 'https://github.com/Jin827/portfolio',
			path : '/var/www/production',
			'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
		}
	}
};
