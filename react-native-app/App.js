import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Meteor from "react-native-meteor";

const SERVER_URL = "ws://localhost:3000/websocket";

export default class App extends React.Component {
  componentDidMount() {
    Meteor.connect(SERVER_URL);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
