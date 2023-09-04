# TruSSI Health Signer
This repository contains two different modules delivered for TruSSI Health project:

- vcIssuance: provides an API to issue verifiable credentials.
- eSeal: provides an API to eSeal verifiable credentials. 

Notice the Postman collection provided under the root directory `TRUSSIHEALTH SIGNER`.

# Run the code

Before running the code, it is required to set environment variables. Both modules provide an `.env.example` with valid examples. Copy paste `.env.example` into a new file `.env` for each module respectively.
For security reasons, we strongly recommend you create your own keys in vcIssuance module and use your own certificate for esealing in eSeal module. Therefore, you should avoid using the example values provided in production.

## Run it with docker-compose

The easiest way to start this two modules is to just run them with docker-compose:
```
 docker-compose up --build -d
```
You can check the status of the services with the following command:

```
docker ps
```

And you can stop them running:
```
docker-compose down
```
## Run them locally

Alternatively, if you prefer to run them locally, you can run the following commands independently. In one terminal you run:

```
# To start eSeal module
cd eSeal
npm install
npm run start
```

And in another terminal you run:

```
# To start vcIssuance module
cd vcIssuance
npm install
npm run start
```


