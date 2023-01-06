const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.POST || 5000;

//user data
const users = [
  { id: 1, name: "Sazzad", email: "sazzad@gmail.com", phone: "01711123123" },
  { id: 2, name: "Shatu", email: "shatu@gmail.com", phone: "01711145123" },
  { id: 3, name: "Tareq", email: "tareq@gmail.com", phone: "01531123893" },
  { id: 4, name: "Jebi", email: "jebi@gmail.com", phone: "01719023123" },
  { id: 5, name: "Samrat", email: "samrat@gmail.com", phone: "01831123123" },
  { id: 6, name: "Sajib", email: "sajib@gmail.com", phone: "01691123123" },
];

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World ");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});

app.get("/users", (req, res) => {
  console.log(req.query);
  //filter by query parameter
  if (req.query.name) {
    const search = req.query.name.toLocaleLowerCase();
    const matched = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    res.send(matched);
  } else {
    res.send(users);
  }
});

app.get("/user/:id", (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  //   const user = users[id];
  const user = users.find((user) => user.id === id);
  res.send(user);
});

app.post("/info", (req, res) => {
  console.log("request", req.body);
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
});
