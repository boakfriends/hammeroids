# Hammeroids

[![Build Status](https://travis-ci.org/boakfriends/hammeroids.svg?branch=master)](https://travis-ci.org/boakfriends/hammeroids)

Description:
A little game with a JS frontend and Ruby backend

Authors: Jason Porter and Dan Goodwin


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
JS tests:

```
npm test
```

## Quirks

Sometimes the webpack-dev-server process doesn't get killed, usually when `bundle exec rackup` is run and event machine reactor fails to start, the dev server starts but isn't closed by `Ctrl+c`.

On the next boot of the application you'll see.

```shell
Error: listen EADDRINUSE 127.0.0.1:8081

```

Firstly `Ctrl+c`, then find the process using this port and kill it.

```
$ lsof -i TCP:8081

COMMAND   PID       USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    75755 dangoodwin   14u  IPv4 0x2075b4f5a26e69c1      0t0  TCP localhost:sunproxyadmin (LISTEN)

kill 75755
```
