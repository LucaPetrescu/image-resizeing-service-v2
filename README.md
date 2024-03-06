<h1> Image resizing service using TypeScript, Express and Node.js </h1>

<p>This is a backend service for image resizing developed with Node.js and TypeScript.</p>

## Description

The service is developed using Node.js related technologies like Express.js, Multer, Sharp and others. There are 3 endpoints that serve different purposes. These are:

````
http://localhost:5000/app/resizeImage/:image_name?resolution=70x70
http://localhost:5000/app/postImage
http://localhost:5000/app/getStats
````

## Getting Started

First, you will need to clone the repository in your local machine:

````
git clone https://github.com/LucaPetrescu/image-resizeing-service-v2/
````

After that, you will need to install the dependencies:

````
npm install
````

Once installed, you can run the application

Before running the app, the application also has a Redis server configured for caching. So first of all, you will need to setup Redis on your machine. Check the Redis docs <a href=https://redis.io/docs/install/install-redis>here</a>.

If you are using a Linux machine, open a terminal window and start the Redis server:

````
redis-server
````
If you are using a Windows machine, then you will need to setup a <a href=https://learn.microsoft.com/en-us/windows/wsl/install>WSL</a> environment. Once you have it, run the above command.

In case you want to have a better view of you redis database, install the <a href=https://docs.redis.com/latest/ri/installing/install-redis-desktop/>RedisInsight client</a>  client.

After everything is setted up, you can run the app:

````
npm run dev
````
For running the endpoints, you can use the above mentioned ones in <a href=https://www.postman.com/>Postman</a>.

The `/app/resizeImage` returns the specified image with the specified resolution.
The `/app/postImage` uploads an image to the local image folder. It will return an object with a field containing a link with the image.
The `/app/getStats` returns the stats of the caching service, i.e hits, misses, hit/miss ratio, cached images, original images etc. It gets the data from the Redis server. Also, for a better visualization of the stats and metrics, the app also has <a href=https://github.com/RafalWilinski/express-status-monitor>Express Status Monitor</a> configured. It is a nice dashboard for monitoring the app in realtime. It provides data like CPU usage, Memory usage, Response Time and others. You can acces it by http://localhost:3000/status.



## Running Jest tests

The application also has tests written to check the functionality of it. For running the test you will need to execute:

````
npm test
````

Feel free to add the test of your choice.


## Running the service in a docker container

The applicaiton also contains a Dockerfile. All the necessary things are allready added in the Dockerfile, but you can customize it as you wish. 

For running the docker container, you will first need to setup <a href=https://docs.docker.com/get-started/>Docker</a> on your local machine.

After that, all you need to do is build the image with:

````
docker build -t <your-image-name> .
````

Once the docker image is built , you can run the container with:

````
docker container run -p <your-port>:5000 <your-image-name>
````
To acces the services, use the same endpoints provided above, just instead of `localhost:5000`, use `127.0.0.1:<your-port>`.
