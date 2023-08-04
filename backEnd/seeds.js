const mongoose = require("mongoose");
const ProductModel = require("./models/product");
const OrderModel = require("./models/order");
const CartModel = require("./models/cart");
const CartProductModel = require("./models/cartProduct");
const OrderHistoryModel = require("./models/orderHistory");

mongoose
      .connect("mongodb://127.0.0.1:27017/ecommerce")
      .then(() => {
            console.log("connected to mongodb");
      })
      .catch((e) => {
            console.log(e);
      });

const data = [
      {
            id: "0",
            name: "Huawei MateBook X Pro",
            image: "huawei-matebook-pro.jpg",
            cpu: "Intel Core i7, 8th generation",
            ram: "8GB",
            storage: "512 GB SSD",
            screen: "13.9-inch, 3K (3,000 x 2,080)",
            price: "1499",
            brand: "Huawei",
            description:
                  "The Huawei MateBook X Pro is our pick for the best laptop money can buy in 2018. This is a gorgeously-designed laptop with a stunning screen (albeit with a rather odd aspect ratio), and it comes packed with cutting edge components that allows it to perform brilliantly, and a battery life that runs rings around many of its rivals. It also has a very competitive price, giving you features, design and performance for quite a bit less money.",
      },
      {
            id: "1",
            name: "Apple Macbook Pro 2018",
            image: "macbook-pro-15.jpg",
            cpu: "6-core Intel i7, 8th generation",
            ram: "16GB",
            storage: "1TB GB SSD",
            screen: "15-inch Retina display",
            price: "3199",
            brand: "Apple",
            description:
                  "If you're after the latest and greatest laptop from Apple, we suggest you look into the 2018 model of the 15-inch MacBook Pro with Touch Bar. The headline Touch Bar – a thin OLED display at the top of the keyboard which can be used for any number of things, whether that be auto-suggesting words as you type or offering Touch ID so you can log in with just your fingerprint – is of course included. It's certainly retained Apple's sense of style, but it comes at a cost. This is a pricey machine, so you may want to consider one of the Windows alternatives. But, if you're a steadfast Apple diehard, this is definitely the best laptop for you!",
      },
      {
            id: "2",
            name: "Dell XPS 13",
            image: "dell-xps-13.png",
            cpu: "Intel Core i7, 8th generation",
            ram: "16GB",
            storage: "512 GB SSD",
            screen: "13.3-inch, Full HD",
            price: "1199",
            brand: "Dell",
            description:
                  "The Dell XPS 13 is an absolutely brilliant laptop. The 2018 version rocks an 8th-generation Intel Core i5 or i7 processor and a bezel-less ‘Infinity Edge’ display, this Dell XPS 13 continues to be the most popular Windows laptop in the world. What’s more, there’s a wide range of customization options, so you can really make the Dell XPS 13 the best laptop for your needs. ",
      },
      {
            id: "3",
            name: "Asus ZenBook Flip S",
            image: "asus-zenbook-flip-s.jpg",
            cpu: "Intel Core i7, 8th generation",
            ram: "16GB",
            storage: "512 GB SSD",
            screen: "13.3-inch, Full HD touchscreen",
            price: "1399",
            brand: "Asus",
            description:
                  "Asus has struck gold with its new refresh of its ZenBook Flip S 2-in-1 laptop. With a new Kaby Lake R 8th-generation processor powering the device, plenty of RAM and a super-fast PCIe SSD in certain models, this is an absolutely stunning laptop. Its 2-in-1 design means you can use it as both a laptop and a tablet, and while it's not as affordable as some other machines, if you have the budget you'll be really happy with this fantastic device.",
      },
      {
            id: "4",
            name: "Samsung Notebook 9",
            image: "samsung-notebook-9.jpg",
            cpu: "Intel Core i7, 8th generation",
            ram: "16GB",
            storage: "256 GB SSD",
            screen: "15-inch, Full HD",
            price: "1499",
            brand: "Samsung",
            description:
                  "While it may not have the best keyboard in the world, the Samsung Notebook 9 is still one of the best laptops you can buy in 2018. Packed with more horsepower than some MacBook Pros,but at a much lower price, Samsung has crafted a laptop that has just as much substance as it does style. Plus, on top of its killer specs, it’s lightweight and thin, making this one of the most portable 15-inch laptops you can buy today.",
      },
];

// data.forEach((element) => {
//       const newProduct = new ProductModel(element);
//       newProduct.save();
// });

async function a() {
      const cart = await CartModel.find({}).populate({
            path: "cartProducts",
            populate: { path: "product" },
      });
      const cartProducts = cart[0].cartProducts;

      const quantity = cartProducts.reduce((total, cartProduct) => {
            return total + cartProduct.quantity;
      }, 0);

      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) {
            dd = "0" + dd;
      }

      if (mm < 10) {
            mm = "0" + mm;
      }
      today = mm + "/" + dd + "/" + yyyy;

      const newOrder = OrderModel({
            orderedProducts: cartProducts,
            quantity,
            date: today,
      });
      await newOrder.save();
      const newOrderHistory = new OrderHistoryModel({
            orders: [newOrder],
      });
      await newOrderHistory.save();
      console.log(newOrderHistory);
}

let brands = ["Asus", "Msi", "Dell", "Apple", "Hp"];
let cpu = ["Amd", "Intel"];
let ram = ["8", "16", "32"];

for (let i = 0; i < 50; i++) {
      let randonmBrand = Math.floor(Math.random() * 5);
      let randomCpu = Math.floor(Math.random() * 2);
      let randomRam = Math.floor(Math.random() * 2);
      let randomPrice = Math.floor(Math.random() * 3000) + 500;
      const product = {
            brand: brands[randonmBrand],
            cpuBrand: cpu[randomCpu],
            ram: ram[randomRam],
            price: randomPrice,
            category: "Laptop",
            name: brands[randonmBrand],
            storage: "1 Tb ssd",
      };
      const newProduct = new ProductModel(product);
      newProduct.save();
}
