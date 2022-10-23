import React, { useState } from "react";
import {
  Button,
  Card,
  Image,
  Checkbox,
  Label,
  Icon,
  Grid,
} from "semantic-ui-react";
import { checkoutCartItems, updateQuantity } from "./CartAPI";

const Cart = (props) => {
  const { cartList, handleRemoveFromCart, handleViewProduct, handleViewCart } =
    props;
  const [itemsToCheckout, setItemsToCheckout] = useState([]);
  const handleProductSelect = (event, selectedProduct) => {
    console.log(selectedProduct);
    const index = itemsToCheckout.findIndex(
      (x) => x.productId == selectedProduct.productId
    );

    if (event.target.checked && index < 0) {
      setItemsToCheckout([...itemsToCheckout, selectedProduct]);
    } else if (!event.target.checked && index > -1) {
      const updatedCheckoutList = itemsToCheckout.filter(
        (x) => x.productId !== selectedProduct.productId
      );
      setItemsToCheckout(updatedCheckoutList);
    }
  };

  const handleCartCheckout = async () => {
    const res = await checkoutCartItems(itemsToCheckout);
    handleViewProduct();
  };

  const handleDecreaseQty = async (item) => {
    if (item.quantity > 1) {
      const res = await updateQuantity({
        ...item,
        quantity: item.quantity - 1,
      });
      handleViewCart();
    }
  };

  const handleIncreaseQty = async (item) => {
    const res = await updateQuantity({ ...item, quantity: item.quantity + 1 });
    handleViewCart();
  };

  return (
    <>
      <Card.Group>
        {cartList &&
          cartList.map((item) => {
            return (
              <Card fluid>
                <Card.Content>
                  <Grid>
                    <Grid.Row
                      style={{
                        backgroundColor: "white",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      <Grid.Column width={1}>
                        <Checkbox
                          id={item.productId}
                          onChange={(e) => handleProductSelect(e, item)}
                          onClick={(e) => handleProductSelect(e, item)}
                        />
                      </Grid.Column>
                      <Grid.Column width={1}>
                        <Image
                          floated="left"
                          size="mini"
                          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                        />
                      </Grid.Column>
                      <Grid.Column width={2}>
                        <Card.Header>{item.title}</Card.Header>
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Card.Description>{item.description}</Card.Description>
                      </Grid.Column>
                      <Grid.Column width={2}>
                        <Card.Description>{item.price}</Card.Description>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            margin: "0.5rem",
                          }}
                        >
                          <Button.Group>
                            <Button
                              icon="minus"
                              content=""
                              negative
                              onClick={() => handleDecreaseQty(item)}
                              disabled={item.quantity === 1}
                            />
                            <Icon name="minus" />
                            <Label basic size="big">
                              {item.quantity}
                            </Label>
                            <Button
                              icon="plus"
                              content=""
                              positive
                              onClick={() => handleIncreaseQty(item)}
                            />
                          </Button.Group>
                          <Button
                            onClick={() => handleRemoveFromCart(item)}
                            basic
                            color="red"
                            style={{ marginLeft: "1rem" }}
                          >
                            Remove
                          </Button>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>

                {/* <Card.Content>
                  <Checkbox
                    id={item.productId}
                    onChange={(e) => handleProductSelect(e, item)}
                    onClick={(e) => handleProductSelect(e, item)}
                  />
                  <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  />
                  <Card.Header>{item.title}</Card.Header>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Content> */}
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    margin: "0.5rem",
                  }}
                >
                  <Button.Group>
                    <Button icon="minus" content="" negative onClick={() => handleDecreaseQty(item)} />
                    <Icon name="minus" />
                    <Label basic size="big">
                      {item.quantity}
                    </Label>
                    <Button icon="plus" content="" positive onClick={() => handleIncreaseQty(item)}/>
                  </Button.Group>
                  <Button
                    onClick={() => handleRemoveFromCart(item)}
                    basic
                    color="red"
                    style={{ marginLeft: "1rem" }}
                  >
                    Remove
                  </Button>
                </div> */}
              </Card>
            );
          })}
      </Card.Group>
      <div style={{ float: "right", marginTop: "4rem" }}>
        <Button icon size="huge" negative onClick={handleViewProduct}>
          <Icon name="cancel" />
          Exit
        </Button>
        <Button as="div" labelPosition="left">
          <Label as="a" basic>
            {itemsToCheckout.length}
          </Label>
          <Button icon size="huge" positive onClick={handleCartCheckout}>
            <Icon name="check" />
            Checkout
          </Button>
        </Button>
      </div>
    </>
  );
};

export default Cart;
