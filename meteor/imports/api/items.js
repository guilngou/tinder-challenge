import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

const Items = new Mongo.Collection("items");

Meteor.methods({
  "Items.addOne": ({ name }) => {
    return Items.insert({ name });
  },
  "Item.like": ({ id }) => {
    return Items.update({ _id: id }, { $inc: { likes: 1 } });
  },
  "Item.dislike": ({ id }) => {
    return Items.update({ _id: id }, { $inc: { dislikes: 1 } });
  },
  "Item.wantMore": ({ id }) => {
    return Items.update({ _id: id }, { $inc: { wantMore: 1 } });
  },
  "Item.wantLess": ({ id }) => {
    return Items.update({ _id: id }, { $inc: { wantLess: 1 } });
  }
});

Meteor.publish("items", () => {
  return Items.find();
});

populate = () => {
  while (Items.find().count() < 10) {
    Items.insert({
      name: "Chips de Banane",
      image:
        "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A1379.jpg",
      likes: 0,
      dislikes: 0,
      wantMore: 0,
      wantLess: 0
    });
  }
};

export default Items;
