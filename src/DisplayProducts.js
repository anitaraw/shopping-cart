import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

const DisplayProducts = (props) => {
  const { productList, handleAddToCart, handleRemoveFromCart } = props;
  return (
    <Card.Group itemsPerRow={4}>
      {productList && productList.map((item) => {
        return (
          <Card>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              wrapped
              // size='small'
              verticalAlign="middle"
              circular
              ui={true}
            />
            <Card.Content>
              <Card.Header>{item.title}</Card.Header>
              <Card.Description>{item.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button onClick={() => handleAddToCart(item)} disabled={item.inCart} color="green">
                  Add To Cart
                </Button>
                {/* <Button onClick={() => handleRemoveFromCart(item)} color="red">
                  Remove From Cart
                </Button> */}
              </div>
              {/* <div className="ui two buttons">
                <Button
                  basic
                  onClick={() => handleAddToCart(item)}
                  color="green"
                >
                  Add To Cart
                </Button>
                <Button
                  basic
                  onClick={() => handleRemoveFromCart(item)}
                  color="red"
                >
                  Remove From Cart
                </Button>
              </div> */}
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  );
};

export default DisplayProducts;
