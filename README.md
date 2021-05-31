# Express Typescript App

### Run

```
yarn
yarn build
yarn start
```

In a second terminal window:

```
yarn
yarn build
yarn start
```

### Dev

```
yarn
yarn watch
```

In new terminal window:

```
yarn dev
```

## Docker

Build:

```
docker build -t <hub-user>/<repo-name>[:<tag>] .
```

Run:

```
docker run -p 4000:8080 <hub-user>/<repo-name>[:<tag>]
```

## Deploy to Heroku with Docker

Confirm logged in to Heroku:

```
heroku login
```

Confirm Docker is running locally:

```
docker ps
```

Sign into Container Registry:

```
heroku container:login
```

Build and push Docker image:

```
heroku container:push web -a "heroku-app-name"
```

Release pushed image and deploy app:

```
heroku container:release web -a "heroku-app-name"
```

Start dyno:

```
heroku ps:scale web=1 -a "heroku-app-name"
```
