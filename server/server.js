import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { debug } from "console";
const app = express();

const port = 8000;
app.use(cors());
app.use(bodyParser.json());

app.listen(port, (err) => {
  if (err) {
    console.log("error while starting server");
  } else {
    console.log("server started!");
  }
});

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

app.get("/products", (req, res) => {
  const productList = fs.readFileSync("./DB/ProductList.json");
  res.send(JSON.parse(productList));
});

app.get("/cart", (req, res) => {
  const cartList = fs.readFileSync("./DB/CartList.json");
  res.send(JSON.parse(cartList));
});

app.post("/cart/remove", (req, res) => {
  const body = req.body;
  jsonReader("./DB/CartList.json", (err, cartItem) => {
    if (err) {
      return;
    }
    const updatedList = cartItem.filter((x) => x.productId !== body.productId);

    fs.writeFile("./DB/CartList.json", JSON.stringify(updatedList), (err) => {
      if (err) {
      } else {
        updateCartFlagInProductList(
          { productsToUpdate: [body], flag: false },
          () => {
            res.send({ status: 200 });
          }
        );
      }
    });
  });
});

const addCheckoutedItems = (newItems) =>{
    jsonReader("./DB/CheckedOutProducts.json", (err, checkoutItems) => {
        if (err) {
          console.log("Error reading file:", err);
          return;
        }
        console.log('checkouted', checkoutItems)
        let updates  = newItems.map(x => { return {...x, date: new Date()}});
        updates = [...checkoutItems, updates];

        console.log('checkoutUpdate ', updates)

        fs.writeFile("./DB/CheckedOutProducts.json", JSON.stringify(checkoutItems), (err) => {
          if (err) {
          }
        });
      });
};

app.post("/cart/add", (req, res) => {
  debug;
  const body = req.body;
  jsonReader("./DB/CartList.json", (err, cartItem) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    const index = cartItem.findIndex((x) => x.productId == body.productId);
    if (index < 0) {
      cartItem.push(body);
    }
    fs.writeFile("./DB/CartList.json", JSON.stringify(cartItem), (err) => {
      if (err) {
      } else {
        updateCartFlagInProductList(
          { productsToUpdate: [body], flag: true },
          () => {
            res.send({ status: 200 });
          }
        );
      }
    });
    

  });
});

const updateCartFlagInProductList = ({ productsToUpdate, flag }, cb) => {
  jsonReader("./DB/ProductList.json", (err, productsList) => {
    const updatedList = productsList.map((item) => {
      const index = productsToUpdate.findIndex(
        (x) => x.productId == item.productId
      );
      if (index > -1) {
        item.inCart = flag;
      }
      return item;
    });

    fs.writeFile(
      "./DB/ProductList.json",
      JSON.stringify(updatedList),
      (err) => {
        if (err) {
          console.log("Error writing file:", err);
        }
        cb();
      }
    );
  });
};

app.post("/cart/checkout", (req, res) => {
  const checkoutCartItemsList = req.body;
  jsonReader("./DB/CartList.json", (err, cartItem) => {
    if (err) {
      return;
    }
    const updatedList = cartItem.filter((item) => {
      if (
        checkoutCartItemsList.findIndex((x) => x.productId == item.productId) >
        -1
      ) {
        return false;
      }
      return true;
    });
    
    addCheckoutedItems(checkoutCartItemsList);

    fs.writeFile("./DB/CartList.json", JSON.stringify(updatedList), (err) => {
      if (err) {
      } else {
        updateCartFlagInProductList(
          { productsToUpdate: checkoutCartItemsList, flag: false },
          () => {
            res.send({ status: 200 });
          }
        );
      }
    });
  });
});

app.post("/cart/updateQty", (req, res) => {
  debug;
  const body = req.body;
  jsonReader("./DB/CartList.json", (err, cartItem) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    const updatedList = cartItem.map((item) => {
      if (item.productId === body.productId) {
        item.quantity = body.quantity;
      }
      return item;
    });

    fs.writeFile("./DB/CartList.json", JSON.stringify(updatedList), (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ status: 200 });
      }
    });
  });
});
