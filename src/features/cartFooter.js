import React, { useState } from "react";
import { Button, Label, Icon } from "semantic-ui-react";

const CartFooter = (props) => {
  const { handleDecreaseQty, handleIncreaseQty } = props;

  return (
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
  );
};

export default CartFooter;
