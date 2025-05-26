

## Description

Bootstrap NestJS with typeorm and adminjs.

Adminjs can't have customized pages because of cjs/esm conflicts and other issues. NodeJS 24 can solve the problem.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
# Features

- [x] image upload to server (seaweedfs S3 compatible)
- [] authentication (RBAC)
- [] authorization
- [] user management
- [] role management
- [] customized adminjs componnents

## Certificates

```bash
$ mkcert -key-file ./cert/key.pem -cert-file ./cert/cert.pem localhost
```


## Generate
### modules
```bash
$ nest g mo ./src/modules/module module
```


## Doc

RBAC : https://medium.com/@dev.muhammet.ozen/role-based-access-control-in-nestjs-15c15090e47d
