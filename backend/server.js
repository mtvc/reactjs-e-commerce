const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
require("dotenv").config();

const mysqlPath = process.env.MYSQL_URL;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPass = process.env.MYSQL_PASS;
const mysqlDbName = process.env.MYSQL_DB_NAME;

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(fileUpload());

// setup static folder
// app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: mysqlPath,
  user: mysqlUser,
  password: mysqlPass,
  database: mysqlDbName,
});

app.get("/", (req, res) => {
  return res.json("from backend side");
});

app.listen(8081, () => {
  console.log("listening on 8081...");
});

//DB connection err handling
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

// API endpoints POST
app.post("/obavestenja", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send("Sva polja su obavezna");
  }

  const sql = "INSERT INTO obavestenja (text) VALUES (?)";
  const values = [text];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).send("Failed to insert data");
    }
    res.send(result.data);
  });
});

//GET
function fetchDataFromDB(table, res) {
  const sql = `SELECT * FROM ${table}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
}
//API endpoints GET

app.get("/artikli", (req, res) => {
  fetchDataFromDB("artikal", res);
});
app.get("/artikalslike", (req, res) => {
  fetchDataFromDB("artikal_slika", res);
});

app.get("/upiti", (req, res) => {
  fetchDataFromDB("query", res);
});

app.get("/grupe", (req, res) => {
  fetchDataFromDB("grupe", res);
});

app.get("/queryes", (req, res) => {
  fetchDataFromDB("query", res);
});

app.get("/korisnik", (req, res) => {
  fetchDataFromDB("porucilac", res);
});
app.get("/orderssadrzaj", (req, res) => {
  fetchDataFromDB("porudzbina_sadrzaj", res);
});

//Grupe
app.get("/grupe/:id", (req, res) => {
  const groupId = req.params.id;
  const sqlQuery = `SELECT * FROM grupe WHERE sifra_nadgrupe = ?`;

  db.query(sqlQuery, [groupId], (error, results) => {
    if (error) {
      console.error("Error fetching data from database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

//Grupa proizvoda
app.get("/artikli/:id", (req, res) => {
  const groupId = req.params.id;
  const sqlQuery = `SELECT * FROM artikal WHERE sifra_nad_grupe = ?`;

  db.query(sqlQuery, [groupId], (error, results) => {
    if (error) {
      console.error("Error fetching data from database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Function to replace special characters
function replaceSpecialCharacters(str) {
  return str
    .replace(/ž/g, "z")
    .replace(/đ/g, "dj")
    .replace(/š/g, "s")
    .replace(/č/g, "c")
    .replace(/ć/g, "c");
}

//Single product
app.get("/artikl/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "SELECT * FROM artikal a LEFT JOIN artikal_slika s ON a.sifra = s.sifra WHERE a.sifra = ?";

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Proizvod nije pronađen" });
    }
    return res.json(data[0]);
  });
});

//Single product update
app.put("/artikl/update/:id", (req, res) => {
  const id = req.params.id;
  const {
    sifra,
    sifra_grupe,
    sifra_nad_grupe,
    naziv,
    naziv_veliki,
    proizvodjac,
    jedmere,
    slika_teh_crteza,
    slikaV,
    slikaM,
    slikaI,
    pdf_spec,
    cena,
    nalageru,
    specifikacija,
    jed_kolicine,
    imapopust,
  } = req.body;
  const sqlUpdate =
    "UPDATE artikal SET sifra = ?, sifra_grupe = ?, sifra_nad_grupe = ?, naziv = ?, naziv_veliki = ?, proizvodjac = ?, jedmere = ?, slika_teh_crteza = ?, slikaV = ?, slikaM = ?, slikaI = ?, pdf_spec = ?, cena = ?, nalageru = ?, specifikacija = ?, jed_kolicine = ?, imapopust = ? WHERE id = ?";

  db.query(
    sqlUpdate,
    [
      sifra,
      sifra_grupe,
      sifra_nad_grupe,
      naziv,
      naziv_veliki,
      proizvodjac,
      jedmere,
      slika_teh_crteza,
      slikaV,
      slikaM,
      slikaI,
      pdf_spec,
      cena,
      nalageru,
      specifikacija,
      jed_kolicine,
      imapopust,
    ],
    (err, data) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (data.length === 0) {
        return res.status(404).json({ error: "Proizvod nije pronađen" });
      }
      return res.json(data[0]);
    }
  );
});

//Search products
app.get("/proizvodi", (req, res) => {
  let { query } = req.query;
  query = replaceSpecialCharacters(query);
  const searchWords = query.split(" ");
  const searchQuery = searchWords.map((word) => `%${word}%`); // Add wildcard to each word

  const conditions = searchWords
    .map(
      () =>
        "(sifra LIKE ? OR naziv LIKE ? OR specifikacija LIKE ? OR naziv_veliki LIKE ? OR keywords LIKE ?)"
    )
    .join(" AND ");
  const sqlQuery = `
    SELECT *
    FROM artikal
    WHERE
      (${conditions})
      AND (${searchWords.map(() => "1=1").join(" AND ")});
  `;

  const queryParams = searchWords.reduce((acc, word) => {
    acc.push(...[...Array(5)].map(() => `%${word}%`));
    return acc;
  }, []);

  db.query(sqlQuery, queryParams, (error, results) => {
    if (error) {
      console.error("Error fetching data from database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

//Update artikala
const readXlsFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

app.put("/artikl/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    sifra,
    sifra_grupe,
    sifra_nad_grupe,
    naziv,
    naziv_veliki,
    proizvodjac,
    jedmere,
    slika_teh_crteza,
    slikaV,
    slikaM,
    slikaI,
    pdf_spec,
    cena,
    nalageru,
    specifikacija,
    jed_kolicine,
    imapopust,
  } = req.body;

  const sqlUpdate =
    "UPDATE artikal SET sifra = ?, sifra_grupe = ?, sifra_nad_grupe = ?, naziv = ?, naziv_veliki = ?, proizvodjac = ?, jedmere = ?, slika_teh_crteza = ?, slikaV = ?, slikaM = ?, slikaI = ?, pdf_spec = ?, cena = ?, nalageru = ?, specifikacija = ?, jed_kolicine = ?, imapopust = ? WHERE id = ?";

  db.query(
    sqlUpdate,
    [
      sifra,
      sifra_grupe,
      sifra_nad_grupe,
      naziv,
      naziv_veliki,
      proizvodjac,
      jedmere,
      slika_teh_crteza,
      slikaV,
      slikaM,
      slikaI,
      pdf_spec,
      cena,
      nalageru,
      specifikacija,
      jed_kolicine,
      imapopust,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Proizvod nije pronađen" });
      }
      return res.json({ message: "Update successful" });
    }
  );
});
