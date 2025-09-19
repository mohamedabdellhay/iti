const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.use(cors());
app.use(jsonServer.defaults());

// لازم يكون بعد الـ defaults
app.db = router.db;

// auth middleware
app.use(auth);

// باقي الـ routes
app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ JSON Server with Auth is running on port ${PORT}`);
});
