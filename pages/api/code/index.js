import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const app = nextConnect();

app.use(middleware)


app.get(async (req, res) => {
  const collection = [];
  await req.db.collection("user").find().forEach((doc) => {
    collection.push(doc)
  });
  res.json(collection)
})

app.post(async (req, res) => {
  const body = req.body
  const resp = await req.db.collection("user").insertOne({
    authorName: body.authorName,
    language_label: body.language_label,
    language: body.language,
    code: body.code,
    edit_pass: body.edit_pass
  })
  res.send(resp)
})

export default app;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}