import { useEffect, useState } from "react";
import "./App.css";
import DisplayProducts from "./DisplayProducts";
import Cart from "./Cart";
import { Button, Icon, Header, Grid, Label } from "semantic-ui-react";
import {
  fetchProductList,
  fetchCartList,
  addToCartList,
  removeFromCartList,
} from "./CartAPI";
import SearchExampleStandard from "./features/SearchExampleStandard";
import CartLayout from "./features/CartLayout";

function App() {
  const [cartList, setCartList] = useState([]);
  const [viewCart, setViewCart] = useState(false);
  const [productList, setProductList] = useState([]);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

  const getProductList = async () => {
    const products = await fetchProductList();
    setProductList(products);
    const itemsInCart = products.filter((x) => x.inCart);
    setNumberOfItemsInCart(itemsInCart.length);
  };

  const getCartList = async () => {
    const cartList = await fetchCartList();
    setCartList(cartList);
  };

  useEffect(() => {
    getProductList();
  }, []);

  const handleAddToCart = async (item) => {
    const res = await addToCartList({ ...item, inCart: true, quantity: 1, totalPrice: item.price, currency: 'INR' });
    getProductList();
  };

  const handleRemoveFromCart = async (item) => {
    const res = await removeFromCartList(item);
    getCartList();
  };

  const handleViewCart = () => {
    setViewCart(true);
    getCartList();
  };

  const handleViewProduct = () => {
    setViewCart(false);
    getProductList();
  };

  return (
    <div className="App">
      <div className="header-container">
        <Grid verticalAlign="middle" style={{ height: "6rem" }}>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header className="header" as="h1">
                Anu Mart
              </Header>
            </Grid.Column>
            <Grid.Column width={6}>
              <SearchExampleStandard productList={productList} />
            </Grid.Column>
            <Grid.Column width={5}>
              {!viewCart ? (
                <>
                  <span
                    onClick={handleViewCart}
                    style={{ float: "right", paddingRight: "2rem" }}
                  >
                    <Icon
                      disabled
                      size="huge"
                      name="shopping cart"
                      style={{
                        color: "white",
                        lineHeight: 1,
                        verticalAlign: "middle",
                        fontSize: "3em",
                      }}
                    />
                    <span className="cart-number">{numberOfItemsInCart}</span>
                  </span>
                </>
              ) : (
                <span
                  onClick={handleViewProduct}
                  style={{ float: "right", paddingRight: "2rem" }}
                >
                  <Icon
                    disabled
                    size="huge"
                    name="home"
                    style={{
                      color: "white",
                      lineHeight: 1,
                      verticalAlign: "middle",
                      fontSize: "3em",
                    }}
                  />
                </span>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div className="container">
        {viewCart && (
          // <Cart
          //   cartList={cartList}
          //   handleRemoveFromCart={handleRemoveFromCart}
          //   handleViewProduct={handleViewProduct}
          //   handleViewCart={handleViewCart}
          // />
          <CartLayout
            cartList={cartList}
            handleRemoveFromCart={handleRemoveFromCart}
            handleViewProduct={handleViewProduct}
            handleViewCart={handleViewCart}
          />
        )}
        {!viewCart && (
          <DisplayProducts
            productList={productList}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        )}
      </div>
    </div>
  );
}

export default App;
