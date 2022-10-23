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
      const isItemSelectedToCheckout = itemsToCheckout.findIndex(x => x.productId === item.productId);
      if(isItemSelectedToCheckout > -1){
          setTotalSelectedItemsPrice(totalSelectedItemsPrice - item.price);
      }
    }
  };

  const handleIncreaseQty = async (item) => {
    const res = await updateQuantity({ ...item, quantity: item.quantity + 1 });
    handleViewCart();
    const isItemSelectedToCheckout = itemsToCheckout.findIndex(x => x.productId === item.productId);
    if(isItemSelectedToCheckout > -1){
        setTotalSelectedItemsPrice(totalSelectedItemsPrice + item.price);
    }
  };

  return (
    <>
      <Table padded="very" singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">
              Select Product
            </Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Unit Price</Table.HeaderCell>
            <Table.HeaderCell>Total Price</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cartList &&
            cartList.map((item) => {
              return (
                <Table.Row style={{ marginBottom: "2rem" }} color={'green'}>
                  <Table.Cell textAlign="center">
                    <Checkbox
                      id={item.productId}
                      onChange={(e) => handleProductSelect(e, item)}
                      onClick={(e) => handleProductSelect(e, item)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image
                        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                        rounded
                        size="mini"
                      />
                      <Header.Content>
                        {item.title}
                        <Header.Subheader>{item.description}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {item.currency} {item.price}
                  </Table.Cell>
                  <Table.Cell>
                    {item.currency} {item.price * item.quantity}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
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
            <Table.HeaderCell textAlign="center">
              <b>Total Price: {totalSelectedItemsPrice}</b>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <div style={{ float: "right", marginTop: "4rem" }}>
        <Button icon size="big" positive onClick={handleCartCheckout}>
          <Icon name="check" />
          Checkout
        </Button>
      </div>
    </>
  );
};

export default CartLayout;
