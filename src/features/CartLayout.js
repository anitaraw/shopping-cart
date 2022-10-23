import React, { useState } from "react";
import {
  Button,
  Card,
  Image,
  Checkbox,
  Label,
  Icon,
  Header,
  Table,
  Grid,
} from "semantic-ui-react";
import { checkoutCartItems, updateQuantity } from "../CartAPI";
import { currencyFormatter } from "../util";

const CartLayout = (props) => {
  const { cartList, handleRemoveFromCart, handleViewProduct, handleViewCart } =
    props;
  const [itemsToCheckout, setItemsToCheckout] = useState([]);
  const [totalSelectedItemsPrice, setTotalSelectedItemsPrice] = useState(0);
  const handleProductSelect = (event, selectedProduct) => {
    console.log(selectedProduct);
    const index = itemsToCheckout.findIndex(
      (x) => x.productId == selectedProduct.productId
    );

    if (event.target.checked && index < 0) {
      setItemsToCheckout([...itemsToCheckout, selectedProduct]);
      setTotalSelectedItemsPrice(
        totalSelectedItemsPrice +
          selectedProduct.quantity * selectedProduct.price
      );
    } else if (!event.target.checked && index > -1) {
      const updatedCheckoutList = itemsToCheckout.filter(
        (x) => x.productId !== selectedProduct.productId
      );
      setItemsToCheckout(updatedCheckoutList);
      setTotalSelectedItemsPrice(
        totalSelectedItemsPrice -
          selectedProduct.quantity * selectedProduct.price
      );
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
      const isItemSelectedToCheckout = itemsToCheckout.findIndex(
        (x) => x.productId === item.productId
      );
      if (isItemSelectedToCheckout > -1) {
        setTotalSelectedItemsPrice(totalSelectedItemsPrice - item.price);
      }
    }
  };

  const handleIncreaseQty = async (item) => {
    const res = await updateQuantity({ ...item, quantity: item.quantity + 1 });
    handleViewCart();
    const isItemSelectedToCheckout = itemsToCheckout.findIndex(
      (x) => x.productId === item.productId
    );
    if (isItemSelectedToCheckout > -1) {
      setTotalSelectedItemsPrice(totalSelectedItemsPrice + item.price);
    }
  };

  const removeFromCart = (selectedProduct) => {
    handleRemoveFromCart(selectedProduct);
    const isItemSelectedToCheckout = itemsToCheckout.findIndex(
      (x) => x.productId === selectedProduct.productId
    );
    if (isItemSelectedToCheckout > -1) {
      setTotalSelectedItemsPrice(
        totalSelectedItemsPrice -
          selectedProduct.quantity * selectedProduct.price
      );
    }
  };

  return (
    <>
      <Table padded="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">
              Select Product
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              style={{ padding: "0rem", margin: "0rem", paddingLeft: "1rem" }}
            >
              Product
            </Table.HeaderCell>
            <Table.HeaderCell width={7} />
            <Table.HeaderCell>Unit Price</Table.HeaderCell>
            <Table.HeaderCell>Total Price</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={5}>
              Action
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cartList &&
            cartList.map((item) => {
              return (
                <Table.Row style={{ marginBottom: "2rem" }} color={"green"}>
                  <Table.Cell textAlign="center">
                    <Checkbox
                      id={item.productId}
                      onChange={(e) => handleProductSelect(e, item)}
                      onClick={(e) => handleProductSelect(e, item)}
                    />
                  </Table.Cell>
                  <Table.Cell
                    width={1}
                    style={{ padding: "0rem", margin: "0rem" }}
                  >
                    <Image
                      src={
                        item.image
                          ? item.image
                          : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
                      }
                      rounded
                      size="mini"
                    />
                  </Table.Cell>
                  <Table.Cell
                    width={7}
                    style={{ paddingLeft: "0rem", marginLeft: "0rem" }}
                  >
                    <Header.Content>
                      {item.title}
                      <Header.Subheader>{item.description}</Header.Subheader>
                    </Header.Content>
                  </Table.Cell>
                  <Table.Cell>
                    {currencyFormatter.format(item.price)}
                  </Table.Cell>
                  <Table.Cell>
                    {currencyFormatter.format(item.price * item.quantity)}
                  </Table.Cell>
                  <Table.Cell textAlign="center" width={5}>
                    <Button.Group>
                      <Button
                        icon="minus"
                        content=""
                        negative
                        onClick={() => handleDecreaseQty(item)}
                        disabled={item.quantity === 1}
                      />
                      <Label basic size="big" style={{ width: "4rem" }}>
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
                      onClick={() => removeFromCart(item)}
                      basic
                      color="red"
                      style={{ marginLeft: "1rem" }}
                    >
                      Remove
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell textAlign="right">
              <span style={{ fontWeight: "bold", marginRight: "0.5rem" }}>
                Total Price: {currencyFormatter.format(totalSelectedItemsPrice)}
              </span>
              <Button icon size="big" positive onClick={handleCartCheckout}>
                <Icon name="check" />
                Checkout
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default CartLayout;
