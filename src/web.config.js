var DeployAgent = require('deploy-agent');

let site = new DeployAgent.site();

if(site.isRunning()) {
    site.stop();
}

site.setConfig(`
    server {
        listen 80;
        server_name static-test-47242.onmodulus.net;

        root /mnt/app;
        index index.html index.htm;

        location /static/ {
            try_files $uri $uri/ =404;
        }

        location /api/ {
            proxy_pass http://node-test-45750.onmodulus.net;
        }
    }
`); 

site.reload();


