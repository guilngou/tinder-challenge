import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { WebBrowser } from "expo";
import Meteor, { withTracker } from "react-native-meteor";
import Swiper from "react-native-deck-swiper";

const SERVER_URL = "ws://localhost:3000/websocket";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      swipedAllCards: false,
      swipeDirection: "",
      isSwipingBack: false,
      cardIndex: 0
    };
  }
  componentDidMount() {
    Meteor.connect(SERVER_URL);
  }

  onSwipe = (id, buttonName) => {
    console.log("id : " + id);
    console.log("buttonName : " + buttonName);

    this.setState({
      cardIndex: this.state.cardIndex + 1
    });

    Meteor.call(`Item.${buttonName}`, { id }, (err, res) => {
      console.log(`Item.${buttonName}`, err, res);
    });
  };

  render() {
    console.log("RENDERING");
    console.log(this.props.items);
    return <View style={styles.container}>{this.renderSwiper()}</View>;
  }

  renderSwiper() {
    console.log("this.state.cardIndex: " + this.state.cardIndex);
    console.log(" ");
    return (
      <Swiper
        cards={this.state.cards}
        renderCard={card => {
          return (
            <View style={styles.card}>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri:
                    "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A1379.jpg"
                }}
              />
            </View>
          );
        }}
        onSwipedLeft={cardIndex => {
          this.onSwipe(cardIndex + 1, "dislike");
        }}
        onSwipedRight={cardIndex => {
          this.onSwipe(cardIndex + 1, "like");
        }}
        onSwipedTop={cardIndex => {
          this.onSwipe(cardIndex + 1, "wantMore");
        }}
        onSwipedBottom={cardIndex => {
          this.onSwipe(cardIndex + 1, "wantLess");
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
})(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  card: {
    flex: 1,
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
