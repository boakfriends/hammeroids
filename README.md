# Hammeroids

Description:
A little game with a JS frontend and Ruby backend

Author: Jason Porter (and Dan Goodwin)


## Setup
Requires Ruby 2.6.1

Run to install gems
```
bundle
```

Run to install other local dependencies.

```
brew bundle
```

Copy `.env.sample` to `.env` and set values.

## Start server
Start redis

```
redis-server
```

Starting server in development environment will also start webpack dev server. After changing any files in `javascript/src` webpack dev server will recompile JS and refresh the browser.

```
bundle exec rackup
```

## Run tests

 ```
 bundle exec rspec
 ```
