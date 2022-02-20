<h1 align="center">
	<img alt="Logo" src=".github/logo.svg" width="200px" />
</h1>

<h3 align="center">
  Ecommerce
</h3>

<p align="center">Uma api feita para um ecommerce</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/saymondamasio/ecommerce-api">

  <a href="https://www.linkedin.com/in/saymondamasio/">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Saymon%20Damásio-gree">
  </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/saymondamasio/ecommerce-api">
  
  <a href="https://github.com/saymondamasio/ecommerce-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/saymondamasio/ecommerce-api">
  </a>
  
  <a href="https://github.com/saymondamasio/ecommerce-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/saymondamasio/ecommerce-api">
  </a>
  
  <img alt="GitHub" src="https://img.shields.io/github/license/saymondamasio/ecommerce-api">
</p>

<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/run/?label=Ecommerce%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fsaymondamasio%2Fecommerce-api%2Fmaster%2Finsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## 👨🏻‍💻 About the project

<p>Essa API tem como objetivo de administrar produtos e clientes de seu ecommerce. Foi feita uma integrações com Stripe um sistema de pagamentos online e com os Correios para obter informações de entrega.</p>

<!-- To see the **web client**, click here: [PROJECT_NAME Web](https://github/saymondamasio/rentx-web)</br>
To see the **mobile client**, click here: [PROJECT_NAME Mobile](https://github/saymondamasio/rentx-mobile) -->

## 🚀 Technologies

Technologies that I used to develop this api

- [Nest.js](https://nestjs.com/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Stripe](https://stripe.com/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [Handlebars](https://handlebarsjs.com/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Tsyringe](https://github.com/microsoft/tsyringe/)
- [dayjs](https://day.js.org/)
- [Swagger](https://swagger.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [GithubActions](https://github.com/features/actions/)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App or click on [Run in Insomnia](#insomniaButton) button

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com//)

> Obs.: Docker is required to run the project on a local machine.

**Clone the project and access the folder**

```bash
$ git clone https://github.com/saymondamasio/ecommerce-api.git && cd ecommerce-api
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Or create manually the instances databases
docker run --name postgres-db -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres
# Don't forget to create the rentx database in postgres before running the project

docker run --name mongo-db -p 27017:27017 -d mongo

docker run --name redis-db -p 6379:6379 -d redis

# To finish, run the api service
$ yarn start:dev

# Well done, project is started!
```

## 🤔 How to contribute

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork saymondamasio/ecommerce-api
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd NOME_DO_REPO

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'
## or use cli commitlint
$ yarn commit

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 &nbsp;by Saymon Damásio 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/saymondamasio/)
