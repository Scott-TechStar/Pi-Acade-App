<img title="Acade App" alt="Acade App" src="./frontend/public/logo192.png" style="width:300px;height:600px;" />

It aims to show you how to use Pi Platform API on the backend side and Pi SDK on the frontend side of your app.


It is composed of two major parts:

* **backend**: a backend app (JSON API built using Node and ExpressJS)
* **frontend**: a single-page frontend app (built using React and create-react-app)


## Initial Development

Read [`doc/development.md`](./doc/development.md) to get started and learn how to run this app in development.

> **WARNING**
>
> The app uses express session cookies which, in the Sandbox environment, are not correctly saved on the client on some browsers.
> To properly test all of the features of the App, we recommend you to open the sandbox app using Mozilla Firefox.


## Deployment

Read [`doc/deployment.md`](./doc/deployment.md) to learn how to deploy this app on a server using Docker and docker-compose.


## Flows

To dive into the implementation of the flows that support the app features, please refer to
[Acade App Flows](./FLOWS.md).
