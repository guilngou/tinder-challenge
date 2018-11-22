import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Meteor, { withTracker } from "react-native-meteor";
import Swiper from "react-native-deck-swiper";

const SERVER_URL = "ws://localhost:3000/websocket";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [{ name: "test1", id: 1 }, { name: "test2", id: 2 }],
      cardIndex: 0
    };
  }
  componentDidMount() {
    Meteor.connect(SERVER_URL);
  }

  onSwipe = (cardIndex, buttonName) => {
    console.log("cardIndex : " + cardIndex);
    console.log("buttonName : " + buttonName);
    console.log(this.props.items[cardIndex]);
    const id = this.props.items[cardIndex]._id;

    Meteor.call(`Item.${buttonName}`, { id }, (err, res) => {
      console.log(`Item.${buttonName}`, err, res);
      if (res) {
        this.setState({
          cardIndex: this.state.cardIndex + 1
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {!!this.props.items ? this.renderSwiper() : <Text>No item</Text>}
      </View>
    );
  }

  renderSwiper() {
    return (
      <Swiper
        cards={this.props.items}
        overlayLabels={{
          bottom: {
            element: (
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "red",
                  color: "red",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                WANT LESS
              </Text>
            ),
            title: "WANT LESS",
            style: {
              label: {
                backgroundColor: "black",
                borderColor: "black",
                color: "white",
                borderWidth: 1
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }
            }
          },
          left: {
            element: (
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "red",
                  color: "red",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                NOPE
              </Text>
            ),
            title: "NOPE",
            style: {
              label: {
                backgroundColor: "black",
                borderColor: "black",
                color: "white",
                borderWidth: 1
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: -30
              }
            }
          },
          right: {
            element: (
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "green",
                  color: "green",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                LIKE
              </Text>
            ),
            title: "LIKE",
            style: {
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: 30
              }
            }
          },
          top: {
            element: (
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "green",
                  color: "green",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                WANT MORE
              </Text>
            ),
            title: "WANT MORE",
            style: {
              label: {
                backgroundColor: "black",
                borderColor: "black",
                color: "white",
                borderWidth: 1
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }
            }
          }
        }}
        renderCard={card => {
          return (
            <View style={styles.card}>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: card.image
                }}
              />
              <Text>{card.name}</Text>
            </View>
          );
        }}
        onSwipedLeft={cardIndex => {
          this.onSwipe(cardIndex, "dislike");
        }}
        onSwipedRight={cardIndex => {
          this.onSwipe(cardIndex, "like");
        }}
        onSwipedTop={cardIndex => {
          this.onSwipe(cardIndex, "wantMore");
        }}
        onSwipedBottom={cardIndex => {
          this.onSwipe(cardIndex, "wantLess");
        }}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        cardIndex={this.state.cardIndex}
        backgroundColor={"#FFFFFF"}
        stackSize={2}
      />
    );
  }
}

export default withTracker(params => {
  Meteor.subscribe("items");
  return {
    count: Meteor.collection("items").find().length,
    items: Meteor.collection("items").find()
  };
})(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  card: {
    flex: 1,
    elevation: 5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});
