import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { currencyFormatter } from "./util";

const DisplayProducts = (props) => {
  const { productList, handleAddToCart, handleRemoveFromCart } = props;
  return (
    <Card.Group itemsPerRow={4}>
      {productList &&
        productList.map((item) => {
          return (
            <Card>
              <div
                style={{
                  height: "20rem",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={
                    item.image
                      ? item.image
                      : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  }
                  fluid
                  size="big"
                  verticalAlign="middle"
                  style={{ width: "auto", height: "100%" }}
                  ui={true}
                />
              </div>
              <Card.Content>
                <Card.Header>{item.title}</Card.Header>
                <Card.Description>{item.description}</Card.Description>
                <Card.Description
                  style={{ color: "#0d9117", fontWeight: "bold" }}
                >
                  {currencyFormatter.format(item.price)}
                </Card.Description>
              </Card.Content>

              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={item.inCart}
                    color="green"
                  >
                    Add To Cart
                  </Button>
                </div>
              </Card.Content>
            </Card>
          );
        })}
    </Card.Group>
  );
};

export default DisplayProducts;
