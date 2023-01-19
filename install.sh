#! /bin/bash

sudo cp ./lundi.conf /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/lundi.conf /etc/nginx/sites-enabled/

sudo service nginx restart
sudo certbot --nginx
sudo certbot renew --dry-run