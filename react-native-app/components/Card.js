import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";



class Card extends React.Component {
  render() {
    const { card } = this.props;
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
  }
}

const styles = StyleSheet.create({
    card: {
      flex: 1,
      elevation: 5,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white"
    }
});

export default Card;


 