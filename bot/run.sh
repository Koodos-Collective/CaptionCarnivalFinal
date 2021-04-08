# containerization
# make sure to add all required dependencies to package.json and package-lock.json
docker build -t memefest .
docker run -it memefest