import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import Meteor, { withTracker } from "react-native-meteor";

const SERVER_URL = "ws://localhost:3000/websocket";

class App extends React.Component {
  componentDidMount() {
    Meteor.connect(SERVER_URL);
  }

  onPressButton = (id, buttonName) => {
    console.log("id : ");
    console.log(id);
    console.log("buttonName : ");
    console.log(buttonName);

    Meteor.call(`Item.${buttonName}`, { id }, (err, res) => {
      console.log(`Item.${buttonName}`, err, res);
    });
    console.log(this.props.items);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.helpContainer}>
          <Text style={styles.instructions}>
            Item Count: {this.props.count}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleAddItem}>
            <Text>Add Item</Text>
          </TouchableOpacity>
        </View>
        <View>
          {!!this.props.items ? this.renderCards() : <Text>No item</Text>}
        </View>
      </View>
    );
  }

  renderCards() {
    return this.props.items.map(item => {
      return (
        <View key={item._id}>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: item.image }}
          />
          <Text>{item.name}</Text>
          <TouchableOpacity
            style={styles.button}
            name="like"
            onPress={() => this.onPressButton(item._id, "like")}
          >
            <Text>Like {item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            name="dislike"
            onPress={() => this.onPressButton(item._id, "dislike")}
          >
            <Text>Dislike {item.dislikes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            name="wantMore"
            onPress={() => this.onPressButton(item._id, "wantMore")}
          >
            <Text>Want more {item.wantMore}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            name="wantLess"
            onPress={() => this.onPressButton(item._id, "wantLess")}
          >
            <Text>Want less {item.wantLess}</Text>
          </TouchableOpacity>
        </View>
      );
    });
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
