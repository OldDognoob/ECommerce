import React, { Component } from "react";

export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    products: [
      {
        _id: "1",
        title: "F16",
        src: "https://unsplash.com/photos/Pi-OmVYHLfM",
        description: "Fighter Jet USA",
        price: 70.000,
        count: 1,
      },
      {
        _id: "2",
        title: "F22",
        src: "https://unsplash.com/photos/nCFxTQV_q9o",
        description: "Raptor USA",
        price:60.000,
        count: 1,
      },
      {
        _id: "3",
        title: "F15",
        src: "https://unsplash.com/photos/b9cU8k3VZNM",
        description: "Aggressive",
        price: 50.000,
        count: 1,
      },
      {
        _id: "4",
        title: "P51 DocMustang ",
        src: "https://unsplash.com/photos/E-c-wWCq99o",
        description: "Fighter Plane US Navy",
        price: 0,
        count: 1,
      },
      {
        _id: "5",
        title: "MIrage",
        src: "https://unsplash.com/photos/duF94czgLVA",
        description: "HAF Mirage Ghost Rider",
        price: 100.000,
        count: 1,
      },
      {
        _id: "6",
        title: "Eurofighter Typhoon",
        src: "https://unsplash.com/photos/QfOhOcrDmvk",
        description: "Cobra",
        price: 170.000,
        count: 1,
      },
    ],
    cart: [],
    total: 0,
  };

  addCart = (id) => {
    const { products, cart } = this.state;
    const check = cart.every((item) => {
      return item._id !== id;
    });
    if (check) {
      const data = products.filter((product) => {
        return product._id === id;
      });
      this.setState({ cart: [...cart, ...data] });
    } else {
      alert("The product has been added to cart.");
    }
  };

  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count += 1;
      }
    });
    this.setState({ cart: cart });
    this.getTotal();
  };

  removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      const { cart } = this.state;
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      this.setState({ cart: cart });
      this.getTotal();
    }
  };

  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };

  componentDidUpdate() {
    localStorage.setItem("dataCart", JSON.stringify(this.state.cart));
    localStorage.setItem("dataTotal", JSON.stringify(this.state.total));
  }

  componentDidMount() {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      this.setState({ cart: dataCart });
    }
    const dataTotal = JSON.parse(localStorage.getItem("dataTotal"));
    if (dataTotal !== null) {
      this.setState({ total: dataTotal });
    }
  }

  render() {
    const { products, cart, total } = this.state;
    const { addCart, reduction, increase, removeProduct, getTotal } = this;
    return (
      <DataContext.Provider
        value={{
          products,
          addCart,
          cart,
          reduction,
          increase,
          removeProduct,
          total,
          getTotal,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
