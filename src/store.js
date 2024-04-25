import axios from "axios";
import { toast } from "react-toastify";
import create from "zustand";
import { devtools } from "zustand/middleware";

const basicUrl = "http://127.0.0.1:8000";
// const basicUrl = "http://coffee-shop-server.test";
// const basicUrl = "http://coffee-shop-server.test/products?filter_type=3";

const users = [
  {
    email: "tom@tom.com",
    password: "tom123",
    role: "user",
  },
  {
    email: "david@david.com",
    password: "david123",
    role: "user",
  },
  {
    email: "sara@sara.com",
    password: "sara123",
    role: "admin",
  },
];

const diets = [
  {
    name: "vegetarian",
  },  
  {
    name: "vegan",
  },
  {
    name: "glutenFree",
  },
  {
    name: "dairyFree",
  },
  {
    name: "nutFree",
  },
  {
    name: "soyaFree",
  },
];

const products = [
  {
    id: 1,
    type: "coffee",
    name: "espresso",
    description:
      "The Espresso is where it all begins. Its rich aroma is the heartbeat of all our coffees. We craft one simple shot of our intense roast for the most elegant of drinks.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/f/3/f/7/f3f7a6ec94bf5cf0e33abe514868baf9f8b5e416_cortado_thumb.jpg",
    price: 1.45,
  },
  {
    id: 2,
    type: "coffee",
    name: "cappuccino",
    description:
      "A special treat made out of intense Espresso, frothy milk and decadent chocolate dusting. Enjoy it hot or ice cold.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/6/7/2/0/6720302656ef87ab8934f72e3c4348d8ede7c36c_spiced_cappuccino_thumb.jpg",
    price: 2.65,
  },
  {
    id: 3,
    type: "coffee",
    name: "latte",
    description:
      "The perfect combination of our aromatic Espresso and creamy milk. This duo is ideal for everyone who loves their drink hot in winter and cold in summer.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/4/4/2/f/442f30d07de52a00aefb8990ce8982b9874bd238_Latte_Thumb.jpg",
    price: 2.15,
  },
  {
    id: 4,
    type: "frostino",
    name: "Mint Choc Chip Frostino & Cream",
    description:
      "A refreshing indulgent treat, combining mint and chocolate in a Frostino, topped with cream and finished with a drizzle of chocolate sauce.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/6/a/6/6/6a66b76e983028e48fa7364d93cdbf7105387f1c_mint_choc_chip_frostino_with_cream_thumb.jpg",
    price: 2.65,
  },
  {
    id: 5,
    type: "frostino",
    name: "Salted Caramel & Cream Frostino",
    description:
      "A sweet, fluffy drink with rich salted caramel, finished with whipped cream and a crunchy topping. Can be made with or without coffee.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/8/0/3/b/803b0a715b62363f2ba8e486f7e7984c24427c7e_salted_caramel_crunch_frostino_with_cream_thumb.jpg",
    price: 2.65,
  },
  {
    id: 6,
    type: "frostino",
    name: "Strawberry & Cream Frostino",
    description:
      "An indulgent blended ice drink, made from strawberry sauce, milk and ice and finished with fresh cream.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/d/c/7/2/dc728e18733b915c2601e85faeba895a95432163_Strawberries___Cream_Frostino_With_Cream_Thumb.jpg",
    price: 2.65,
  },
  {
    id: 7,
    type: "food",
    name: "Brown Toast",
    description:
      "Two slices of toasted malted bloomer bread packed with sunflower seeds, linseeds and oats. Offered with butter and marmalade.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/c/1/7/7/c177801bf092440c84dcc739edcae80f6b2ccfe5_toast_brown_thumb.jpg",
    price: 2.65,
  },
  {
    id: 8,
    type: "food",
    name: "White Toast",
    description:
      "Two slices of white bloomer bread, toasted to perfection. Offered with butter and marmalade.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/c/9/4/d/c94d934e85e86c1c1ec4f5454f1c17fc64c09c16_toast_white_thumb.jpg",
    price: 2.65,
  },
  {
    id: 9,
    type: "food",
    name: "Fruited Teacake",
    description:
      "A sweet dough with an abundance of sultanas and raisins. Offered with butter.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/0/0/0/3/0003f3d9624763cb3666fc68bde84fcaf1a8b45c_fruited_teacake_thumb.jpg",
    price: 2.65,
  },
  {
    id: 10,
    type: "pastries",
    name: "Chocolate Twist",
    description: "All butter pastry twist with dark chocolate.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/1/5/1/3/15136d0f218b7a64efe460d0dd6353e6af5b19f2_chocolate_twist_thumb.png",
    price: 1.5,
  },
  {
    id: 11,
    type: "pastries",
    name: "Caramel Pecan Danish",
    description:
      "Danish Pastry with a caramel creme filling and pecan pieces on top.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/d/2/7/7/d27739f0ff720de3ed3914dc7a3150eb66249fc3_pecan_danish_thumb.jpg",
    price: 1.5,
  },
  {
    id: 12,
    type: "pastries",
    name: "Pain aux Raisins",
    description: "All butter pastry swirled with raisins.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/7/c/d/7/7cd7714ff33f674ae36702d2b20fa71c00d088d2_Improved_Pain_Aux_Raisin_Thumb.jpg",
    price: 1.5,
  },
  {
    id: 14,
    type: "food",
    name: "Ham and Cheese Toastie",
    description: "All butter pastry twist with dark chocolate.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/b/1/e/1/b1e1fa8dc4902634091364d713b6c8d77f246c8b_ham_cheese_toastie_marked_thumb.png",
    price: 2.3,
  },
  {
    id: 15,
    type: "food",
    name: "Tuna Melt Panini",
    description:
      "Danish Pastry with a caramel creme filling and pecan pieces on top.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/f/f/2/2/ff224aeb737aaedb0a1ba755d577717029b32637_tuna_melt_panini_thumb.jpg",
    price: 2.8,
  },
  {
    id: 111,
    type: "food",
    name: `Vegan Bac'n Bap`,
    description: "All butter pastry swirled with raisins.",
    imageUrl:
      "https://www.costa.co.uk/static/pim/f/8/e/b/f8eb3875a47024a44fcea70c27e58725b1f99bb3_vegan_bac_n_thumb__1_.png",
    price: 2.3,
  },
];

const dietsOnProduct = [
  {
    productId: 1,
    dietId: 1,
  },
  {
    productId: 1,
    dietId: 2,
  },
  {
    productId: 1,
    dietId: 3,
  },
  {
    productId: 1,
    dietId: 4,
  },
  {
    productId: 1,
    dietId: 5,
  },
  {
    productId: 1,
    dietId: 6,
  },
  {
    productId: 2,
    dietId: 1,
  },
  {
    productId: 2,
    dietId: 2,
  },
  {
    productId: 2,
    dietId: 3,
  },
  {
    productId: 3,
    dietId: 1,
  },
  {
    productId: 3,
    dietId: 2,
  },
  {
    productId: 3,
    dietId: 3,
  },
  {
    productId: 4,
    dietId: 1,
  },
  {
    productId: 4,
    dietId: 2,
  },
  {
    productId: 4,
    dietId: 3,
  },
  {
    productId: 5,
    dietId: 1,
  },
  {
    productId: 5,
    dietId: 2,
  },
  {
    productId: 5,
    dietId: 3,
  },
  {
    productId: 6,
    dietId: 1,
  },
  {
    productId: 6,
    dietId: 2,
  },
  {
    productId: 6,
    dietId: 3,
  },
  {
    productId: 7,
    dietId: 1,
  },
  {
    productId: 7,
    dietId: 5,
  },
  {
    productId: 7,
    dietId: 6,
  },
  {
    productId: 8,
    dietId: 1,
  },
  {
    productId: 8,
    dietId: 5,
  },
  {
    productId: 8,
    dietId: 6,
  },
  {
    productId: 9,
    dietId: 1,
  },
  {
    productId: 9,
    dietId: 5,
  },
  {
    productId: 9,
    dietId: 6,
  },
  {
    productId: 10,
    dietId: 1,
  },
  {
    productId: 10,
    dietId: 4,
  },
  {
    productId: 10,
    dietId: 5,
  },
  {
    productId: 11,
    dietId: 1,
  },
  {
    productId: 11,
    dietId: 2,
  },
  {
    productId: 11,
    dietId: 6,
  },
  {
    productId: 12,
    dietId: 1,
  },
  {
    productId: 12,
    dietId: 2,
  },
  {
    productId: 12,
    dietId: 6,
  },
  {
    productId: 13,
    dietId: 5,
  },
  {
    productId: 13,
    dietId: 6,
  },
  {
    productId: 14,
    dietId: 5,
  },
  {
    productId: 14,
    dietId: 6,
  },
  {
    productId: 15,
    dietId: 1,
  },
  {
    productId: 15,
    dietId: 2,
  },
  {
    productId: 15,
    dietId: 5,
  },
];

const useStore = create(
  devtools((set, get) => ({
    // baseUrl: "http://coffee-shop-server.test/",
    baseUrl: "http://127.0.0.1:8000",

    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),

    //AUTH
    authenticatedUser: null,
    setAuthenticatedUser: (user) => set({ authenticatedUser: user }),
    getUserByAccessToken: async (access_token) => {
      try {
        const user = await axios.get(basicUrl + "/api/user", {
          headers: {
            Authorization: access_token,
          },
        });
        return user;
      } catch (error) {
        console.error("message getUserByAccessToken", error);
        return error; 
      }
    },
    getImagePath: (path) => {
      if (!path) return "/images";
      if (path.includes("http")) return path;

      return basicUrl + "/storage/" + path;
    },

    signinUrl: `${basicUrl}/api/register`,
    loginUrl: `${basicUrl}/api/login`,
    logoutUrl: `${basicUrl}/api/logout`,
    getUsersUrl: `${basicUrl}/users`,
    createProductUrl: `${basicUrl}/products`,
    createOrderUrl: `${basicUrl}/orders`,
    getProductPaginationUrl: (currentPage) =>
      `${basicUrl}/products?page=${currentPage}`,
    getOrderPaginationUrl: (currentPage) =>
      `${basicUrl}/orders?page=${currentPage}`,
    getUpdateProductUrl: (productId) =>
      `${basicUrl}/products/${productId}/update?_method=PATCH`,
    getProductAttachTypeUrl: (productId) =>
      `${basicUrl}/products/${productId}/attach`,
    getProductDetachTypeUrl: (productId) =>
      `${basicUrl}/products/${productId}/detach`,
    uploadImageByProductIdUrl: (productId) =>
      `${basicUrl}/images/${productId}/upload-file`,

    getProductById: async (productId) => {
      try {
        const resp = await axios.get(`${basicUrl}/products/${productId}/edit`);
        return resp.data;
      } catch (error) {
        console.error("get getProductById error: ", error);
      }
    },

    onDeleteProduct: async (productId) => {
      axios.defaults.withCredentials = true;

      const access_token = sessionStorage.getItem("access_token");
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: access_token,
        },
      };

      const loading = toast.loading("Creating a new product...", {
        position: toast.POSITION.TOP_RIGHT,
      });

      try {
        const response = await axios.post(
          `${basicUrl}/products/${productId}/delete?_method=DELETE`,
          {},
          config
        );

        if (response.data) {
          toast.update(loading, {
            render: `Message: The product has been remove from table.`,
            type: "info",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2400,
            className: "custom-toast",
            theme: "light",
            hideProgressBar: true,
          });

          console.log(response);

          return response.data;
        }
      } catch (error) {
        toast.update(loading, {
          render: `Message: an error has occurred`,
          type: "error",
          isLoading: false,
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          className: "custom-toast",
          theme: "light",
          hideProgressBar: true,
        });

        console.error("error on delete product: ", error);
      }
    },
    /////

    orderStatuses: [],
    setOrderStatuses: (values) => {
      set({ orderStatuses: values });
    },
    fetchOrderStatuses: async () => {
      try {
        const resp = await axios.get(`${basicUrl}/orders/statuses`);
        const statuses = resp.data;
        console.log("order statuses in store: ", statuses);
        set({ orderStatuses: statuses });
      } catch (error) {
        console.error("get types error: ", error);
      }
    },

    getOrderById: async (orderId) => {
      try {
        const resp = await axios.get(`${basicUrl}/orders/${orderId}/edit`);
        return resp.data;
      } catch (error) {
        console.error("getOrderById error: ", error);
      }
    },

    types: [],
    setTypes: (values) => {
      set({ types: values });
    },
    fetchTypes: async () => {
      try {
        const resp = await axios.get(`${basicUrl}/types`);
        const types = resp.data;
        console.log("types in store: ", types);
        set({ types: types });
      } catch (error) {
        console.error("get types error: ", error);
      }

      // fetch(`${basicUrl}/types`)
      //   .then((resp) => resp.json())
      //   .then((data) => {
      //     console.log("types in store: ", data);
      //     set({ types: data });
      //   })
      //   .catch((error) => console.error("get types error: ", error));
    },

    orders: [],
    setOrders: (values) => {
      set({ orders: values });
    },
    fetchOrders: async () => {
      try {
        const resp = await axios.get(`${basicUrl}/orders`);
        const orders = resp.data.orders;
        console.log("orders in store: ", orders);
        set({ orders: orders });
      } catch (error) {
        console.error("get coffee error: ", error);
      }
    },

    products: [],
    setProducts: (values) => {
      set({ products: values });
    },
    fetchProducts: async () => {
      try {
        const resp = await axios.get(`${basicUrl}/products`);
        const products = resp.data.products;
        console.log("products in store: ", products);
        set({ products: products });
      } catch (error) {
        console.error("get coffee error: ", error);
      }
    },

    coffees: [],
    fetchCoffees: async () => {
      fetch(`${basicUrl}/products?filter_type=1`)
        .then((resp) => resp.json())
        .then((fetchedCoffees) => {
          console.log("fetchedCoffees in store: ", fetchedCoffees);
          set({ coffees: fetchedCoffees });
        })
        .catch((error) => console.error("get coffee error: ", error));
    },

    drink: [],
    fetchDrinks: () => {
      // fetch(`${basicUrl}/products/drink`)
      // 	.then(resp => resp.json())
      // 	.then(fetchedDrinks => {
      // 		console.log('fetchedDrinks in store: ', fetchedDrinks)
      // 		set({ drink: fetchedDrinks })
      // 	})

      const data = products.filter((product) => product.type === "drink");
      set({ drink: data });
    },

    frostino: [],
    fetchFrostino: () => {
      fetch(`${basicUrl}/products?filter_type=2`)
        .then((resp) => resp.json())
        .then((fetchedFrostinos) => {
          console.log("fetchedSnack in store: ", fetchedFrostinos);
          set({ frostino: fetchedFrostinos });
        });

      // const data = products.filter((product) => product.type === "frostino");
      // set({ frostino: data });
    },

    food: [],
    fetchFood: () => {
      fetch(`${basicUrl}/products?filter_type=3`)
        .then((resp) => resp.json())
        .then((fetchedFood) => {
          console.log("fetchedFood in store: ", fetchedFood);
          set({ food: fetchedFood });
        });

      // const data = products.filter((product) => product.type === "food");
      // set({ food: data });
    },

    snacks: [],
    fetchSnacks: () => {
      // fetch(`${basicUrl}/products/snack`)
      // 	.then(resp => resp.json())
      // 	.then(fetchedSnacks => {
      // 		console.log('fetchedSnack in store: ', fetchedSnacks)
      // 		set({ snacks: fetchedSnacks })
      // 	})
      const data = products.filter((product) => product.type === "snack");
      set({ snacks: data });
    },

    pastries: [],
    fetchPastries: () => {
      fetch(`${basicUrl}/products?filter_type=4`)
        .then((resp) => resp.json())
        .then((fetchedPastries) => {
          console.log("fetchedPastries in store: ", fetchedPastries);
          set({ pastries: fetchedPastries });
        });

      // const data = products.filter((product) => product.type === "pastries");
      // set({ pastries: data });
    },

    user: {
      name: "",
      email: "",
      password: "",
      number_phone: "",
      address: "",
      password_confirmation: "",
    },
    setUser: (user) => {
      set({ user });
    },

    basketItems: [],
    addItemBasket: (newItem) => {
      const exist = get().basketItems.find((item) => item.id === newItem.id);
      if (exist) {
        set({
          basketItems: get().basketItems.map((item) =>
            item.id === newItem.id ? { ...exist, qnt: exist.qnt + 1 } : item
          ),
        });
      } else {
        set({ basketItems: [...get().basketItems, { ...newItem, qnt: 1 }] });
      }
    },

    removeItemBasket: (targetItem) => {
      const exist = get().basketItems.find((item) => item.id === targetItem.id);
      if (exist.qnt === 1) {
        set({
          basketItems: get().basketItems.filter(
            (item) => item.id !== targetItem.id
          ),
        });
      } else {
        set({
          basketItems: get().basketItems.map((item) =>
            item.id === targetItem.id ? { ...exist, qnt: exist.qnt - 1 } : item
          ),
        });
      }
    },

    removeAllBasketItems: () => set({ basketItems: [] }),

    totalToPay: 0,
  }))
);

export default useStore;

// EXAMPLE - add more items into an existing state
// expenses: monthlyExpenses,
// setExpenses: (newExpenses) => {
// 	console.log('Getting expenses', get, get().expenses);
// 	set({ expenses: [...get().expenses, newExpenses] });
// }

// import create from 'zustand'
// import { devtools } from 'zustand/middleware'

// const basicUrl = 'http://localhost:4000'

// const useStore = create(
// 	devtools((set, get) => ({
// 		//AUTH
// 		authenticatedUser: null,
// 		setAuthenticatedUser: user => set({ authenticatedUser: user }),

// 		signinUrl: `${basicUrl}/signup`,
// 		loginUrl: `${basicUrl}/login`,
// 		getUsersUrl: `${basicUrl}/users`,

// 		coffees: [],
// 		fetchCoffees: () => {
// 			fetch(`${basicUrl}/products/coffee`)
// 				.then(resp => resp.json())
// 				.then(fetchedCoffees => {
// 					console.log('fetchedCoffees in store: ', fetchedCoffees)
// 					set({ coffees: fetchedCoffees })
// 				})
// 		},

// 		drink: [],
// 		fetchDrinks: () => {
// 			fetch(`${basicUrl}/products/drink`)
// 				.then(resp => resp.json())
// 				.then(fetchedDrinks => {
// 					console.log('fetchedDrinks in store: ', fetchedDrinks)
// 					set({ drink: fetchedDrinks })
// 				})
// 		},

// 		frostino: [],
// 		fetchFrostino: () => {
// 			fetch(`${basicUrl}/products/frostino`)
// 				.then(resp => resp.json())
// 				.then(fetchedFrostinos => {
// 					console.log('fetchedSnack in store: ', fetchedFrostinos)
// 					set({ frostino: fetchedFrostinos })
// 				})
// 		},

// 		food: [],
// 		fetchFood: () => {
// 			fetch(`${basicUrl}/products/food`)
// 				.then(resp => resp.json())
// 				.then(fetchedFood => {
// 					console.log('fetchedFood in store: ', fetchedFood)
// 					set({ food: fetchedFood })
// 				})
// 		},

// 		snacks: [],
// 		fetchSnacks: () => {
// 			fetch(`${basicUrl}/products/snack`)
// 				.then(resp => resp.json())
// 				.then(fetchedSnacks => {
// 					console.log('fetchedSnack in store: ', fetchedSnacks)
// 					set({ snacks: fetchedSnacks })
// 				})
// 		},

// 		pastries: [],
// 		fetchPastries: () => {
// 			fetch(`${basicUrl}/products/pastries`)
// 				.then(resp => resp.json())
// 				.then(fetchedPastries => {
// 					console.log('fetchedPastries in store: ', fetchedPastries)
// 					set({ pastries: fetchedPastries })
// 				})
// 		},

// 		user: { email: '', password: '' },
// 		setUser: user => {
// 			set({ user })
// 		},

// 		basketItems: [],
// 		addItemBasket: newItem => {
// 			const exist = get().basketItems.find(item => item.id === newItem.id)
// 			if (exist) {
// 				set({
// 					basketItems: get().basketItems.map(item =>
// 						item.id === newItem.id ? { ...exist, qnt: exist.qnt + 1 } : item
// 					),
// 				})
// 			} else {
// 				set({ basketItems: [...get().basketItems, { ...newItem, qnt: 1 }] })
// 			}
// 		},

// 		removeItemBasket: targetItem => {
// 			const exist = get().basketItems.find(item => item.id === targetItem.id)
// 			if (exist.qnt === 1) {
// 				set({
// 					basketItems: get().basketItems.filter(
// 						item => item.id !== targetItem.id
// 					),
// 				})
// 			} else {
// 				set({
// 					basketItems: get().basketItems.map(item =>
// 						item.id === targetItem.id ? { ...exist, qnt: exist.qnt - 1 } : item
// 					),
// 				})
// 			}
// 		},

// 		removeAllBasketItems: () => set({ basketItems: [] }),

// 		totalToPay: 0,
// 	}))
// )

// export default useStore

// EXAMPLE - add more items into an existing state
// expenses: monthlyExpenses,
// setExpenses: (newExpenses) => {
// 	console.log('Getting expenses', get, get().expenses);
// 	set({ expenses: [...get().expenses, newExpenses] });
// }
