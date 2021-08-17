# Freelance-support-server

Run command:
npm start

## steps to deploy to heroku

Download/Install Heroku CLI

--- ubuntu ---
sudo snap install --classic heroku

--- windows ----
Download heroku cli from browser

--- using npm ----
npm i -g heroku

heroku create localsupplyin
git remote -v

heroku login
git add
git commit
git push
git push geroku master

### logs

heroku logs

### env variables

heroku config:set key=value

run heroku config
to see all env variables

## server URL

https://freelance-support-server.herokuapp.com/
