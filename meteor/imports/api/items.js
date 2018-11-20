import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

const Items = new Mongo.Collection("items");

populate = () => {
  while (Items.find().count() < 10) {
    Items.insert({
      name: faker.commerce.product(),
      image: faker.image.food(),
      likes: 0,
      dislikes: 0,
      wantMore: 0,
      wantLess: 0
    });
  }
};

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

export default Items;
