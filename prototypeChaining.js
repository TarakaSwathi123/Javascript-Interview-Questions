//Every JavaScript object has a hidden link to another object called its prototype. When you try to access a property that doesn't exist on an object, JavaScript automatically looks for it in the prototype, then the prototype's prototype, and so on.

//ex->
const animal = {
  speaks: true,
  walk() {
    console.log("my dog will bark");
  },
};
//how can be it this abject is prototyped

const cat = {
  jums: true,
  __proto__: animal,
};

console.log(cat.jums);
console.log(cat.speaks);
///output
//true
//true
cat.walk();
//my dog will bark
