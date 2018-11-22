import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

const Items = new Mongo.Collection("items");

Meteor.methods({
  "Items.addOne": ({ name }) => {
    return Items.insert({ name });
  },
  "Item.like": ({ id }) => {
    console.log(Items.findOne({ _id: `${id}` }));
    return Items.update({ _id: `${id}` }, { $inc: { likes: 1 } });
  },
  "Item.dislike": ({ id }) => {
    console.log(id);
    console.log(Items.findOne({ _id: id }));
    return Items.update({ _id: id }, { $inc: { dislikes: 1 } });
  },
  "Item.wantMore": ({ id }) => {
    console.log(Items.findOne({ _id: `${id}` }));
    return Items.update({ _id: `${id}` }, { $inc: { wantMore: 1 } });
  },
  "Item.wantLess": ({ id }) => {
    console.log(Items.findOne({ _id: `${id}` }));
    return Items.update({ _id: `${id}` }, { $inc: { wantLess: 1 } });
  }
});

Meteor.publish("items", () => {
  return Items.find();
});

populate = () => {
  Items.insert({
    name: "Chips de Banane",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A1379.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
  Items.insert({
    name: "Mix Fruits secs",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A1837.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
  Items.insert({
    name: "Amandes",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A1843.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
  Items.insert({
    name: "Chocolate Kiss",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A1366-min.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
  Items.insert({
    name: "Orange",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A2265-min.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
  Items.insert({
    name: "Smoothie",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A2086-min.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
  Items.insert({
    name: "Thé Vert Jasmin",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A4721-min.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
  Items.insert({
    name: "Cookie Artisanal",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A1523-min.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
  Items.insert({
    name: "Pomme",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A2253-min.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
  Items.insert({
    name: "Café Moka Lekempti",
    image:
      "https://s3.eu-central-1.amazonaws.com/totems3/products/3C5A2204-min.jpg",
    likes: 0,
    dislikes: 0,
    wantMore: 0,
    wantLess: 0
  });
};

export default Items;
