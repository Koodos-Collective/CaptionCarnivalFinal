# caption carnival

led by the great ol' capt. shon, this is a discord game that allows you to have a 🎡 caption carnival 🎪 in your puny lil' discord server [coming soon]

## old dockerfile

```Dockerfile
# old Dockerfile
FROM node:14.14.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install

COPY . /app
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]
```

## old deploy.sh file

```bash
#!/bin/bash
set -e

IMAGE_TAG=`git rev-parse HEAD`
REPO_NAME="caption-carnival-website"
GCP_PROJECT_NAME="local-circuit-297619"

docker build . -t $REPO_NAME:$IMAGE_TAG
# docker run -it -e PORT=8080 -p 8080:8080 $REPO_NAME:$IMAGE_TAG
docker tag $REPO_NAME gcr.io/$GCP_PROJECT_NAME/$REPO_NAME:$IMAGE_TAG
docker push gcr.io/$GCP_PROJECT_NAME/$REPO_NAME:$IMAGE_TAG

gcloud beta run deploy $REPO_NAME --image gcr.io/$GCP_PROJECT_NAME/$REPO_NAME:$IMAGE_TAG \
  --project $GCP_PROJECT_NAME \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## scripts with docker

```json
(...)
"scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start -p $PORT"
    },
(...)
```

## current app.yaml file

```yaml
runtime: nodejs
env: flex
automatic_scaling:
    cool_down_period_sec: 180
    cpu_utilization:
        target_utilization: 0.9
resources:
    cpu: 2
    memory_gb: 2.5
    disk_size_gb: 10
readiness_check:
    app_start_timeout_sec: 1800
```

## deploying app on app engine

```bash
gcloud app deploy --project local-circuit-297619
```
