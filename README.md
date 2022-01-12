<div style="text-align:center"><img src="./public/Banner.png" style="" />
</div>

<h1 align="center">MongShare</h1>
<h3 align="center"><b>Sharing Code With MongShare!</b></h3>
This project is made with `Next.js`

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
