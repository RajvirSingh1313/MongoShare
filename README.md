<div style="text-align:center">
  <img src="./public/Banner.png" style="" />
</div>
<div align="center">
  
  ![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
  ![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  ![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

</div>

<h1 align="center">MongShare</h1>
<h3 align="center"><b>Sharing Code With MongShare!</b></h3>

## About
MongShare helps with sharing your code. It is made with MongoDB & Next.js. MongShare is a hackathon project for [MongoDB Atlas Hackathon on DEV](https://dev.to/devteam/announcing-the-mongodb-atlas-hackathon-on-dev-4b6m).

## Local Development

- ### Fork the repo on GitHub

- ### Clone the repo

```sh
git clone https://github.com/rajvirsingh1313/mongshare
cd mongshare
```

- ### Create a next.config.js file in the root dir

```js
module.exports = {
  env: {
    ATLAS_URI:
      "mongodb+srv://<username>:<password>@cluster0.lydaj.mongodb.net/mongshare?retryWrites=true&w=majority",
    DOMAIN: "http://localhost:3000",
  },
};
```

- ### Install Dependencies

```sh
npm i
```

- ### Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
