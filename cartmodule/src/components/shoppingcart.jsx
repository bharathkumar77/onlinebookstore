import React from 'react';
import axios from 'axios';
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {

  state = {
    productDetails: [],
    totalprice: 0,
    discountedTotalPrice: 0,
    totalDiscount: 0
  }
  // Fetching the details from the Database using get route
  componentDidMount = async () => {
    await axios.get('/data')
      .then((response) => {
        const data = response.data;
        this.setState({ productDetails: data });
      })

    this.calculate();
  };

  //Calculating the totalprice and Discounted Total Price
  calculate = () => {

    let totalprice = 0;
    const data = this.state.productDetails;
    var discountedTotalPrice = 0;
    for (var i in data) {
      totalprice += (parseInt(data[i].price) * parseInt(data[i].quantity));
      discountedTotalPrice += (((100 - parseInt(data[i].discount)) * (parseInt(data[i].price)) / 100) * parseInt(data[i].quantity));
    }
    totalprice = totalprice.toFixed(2);
    discountedTotalPrice = discountedTotalPrice.toFixed(2);
    var discount = (totalprice - discountedTotalPrice).toFixed(2);
    this.setState({ discount })
    this.setState({ totalprice })
    this.setState({ discountedTotalPrice })
  }

  //Delete an item and getting the new data from DB and storing in State
  handleDeleteItem = async (id) => {
    await axios.get(`/delete/${id}`, (err, res) => {
      if (err)
        console.log(err)
      else
        console.log(res)
    }).then(response => {
      console.log(response.data)
      this.setState({ productDetails: response.data })

      window.location.reload(false)
    })

  }

  //Handling the Increment and Decrement Buttons for Quantity in the cart
  handleQuantityIncrement = async (id, quantity) => {

    await axios.get(`/increasequantity/${id}`, (err, res) => {
      if (err)
        console.log(err)
      else
        console.log(res)
    }).then(response => {
      console.log(response.data)
      this.setState({ productDetails: response.data })

      window.location.reload(false)
    })
  }

  handleQuantityDecrement = async (id, quantity) => {

    if (quantity == 1) {
      alert("Quantity can't be less than 1. You can try deleting the item")
    }
    else {
      await axios.get(`/decreasequantity/${id}`, (err, res) => {
        if (err)
          console.log(err)
        else
          console.log(res)
      }).then(response => {
        console.log(response.data)
        this.setState({ productDetails: response.data })

        window.location.reload(false)
      })
    }
  };


  render() {
    return (<div className="row">
      <div className="col-lg-7 border rounded mainContainer" >
        <div className="bg-dark text-light p-2 rounded">
          <legend className="text-center" style={{ fontSize: "30px" }}>Cart Details</legend>
        </div>
        <table className="table w-100 border">
          <thead>
            <tr>
              <th className="w-75" style={{ fontSize: "24px" }}>Product Details</th>
              <th className="w-25" style={{ fontSize: "24px" }}>Total Price</th>
            </tr>
          </thead>
          <tbody>

            {/*Mapping the state variables into jsx elements */}
            {this.state.productDetails.map(product => (

              <tr className=" rounded">
                <td>
                  <div className="container row">
                    <div className="col-lg-4 rounded shadow border border-dark">
                      <img style={{ height: '180px', width: '100%' }} src={product.imgsrc} />
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-7">
                      <h4>{product.name}</h4>
                      <button className="btn quantity btn-outline-success mb-2" type="button" onClick={() => { this.handleQuantityIncrement(product.id) }}>+</button>
                      <span style={{ fontSize: '20px' }}> Total Quantity: {product.quantity} </span>
                      <button className="btn quantity btn-outline-danger mb-2" onClick={() => { this.handleQuantityDecrement(product.id, product.quantity) }}>-</button>
                      {/* Checks if there's any discount and hence displays the respective JSX */}
                      {product.discount > 0 ?
                        <h5><strike>Actual Item Price: {product.price}</strike></h5>
                        :
                        <h5 style={{ color: "green" }}>Actual Item Price: {product.price}</h5>
                      }
                      <small><i>{product.description}</i></small>
                      {product.discount > 0 ?
                        <p className="discountText">Discount: {product.discount + "%"}</p>
                        : <p className="discountText"> No Discount</p>}
                    </div>
                  </div>
                </td>
                <td className="w-25">
                  <h5 className="text-center w-25">{(((100 - product.discount) * product.price) / 100 * product.quantity) + "₹"}</h5>

                  <button type="button"
                    className="btn-outline-danger btn btn-sm ml-2"
                    onClick={() => this.handleDeleteItem(product.id)}>
                    <BsFillTrashFill />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {/*Sticky Sidebar that displays the total amount*/}
      <div className="col-lg-3 text-center bg-dark text-light  shadow-lg p-5 sticky-sidebar" style={{ height: "300px" }}>
        <h5><strike>Total Price: {this.state.totalprice + " ₹"}</strike></h5>
        <h5>Total Discount: {this.state.discount + " ₹"}</h5>
        <h6>Total Items: {this.state.productDetails.length}</h6>
        <br />
        {this.state.productDetails.length > 0 ?
          <Link to="/checkout">
            <button className=" btn-success btn btn-lg sidebar-buttons">Proceed to pay {this.state.discountedTotalPrice + " ₹"}</button>
          </Link>
          : <Link to="/"><button className=" btn-outline-success btn sidebar-buttons" >Go back To Products</button>
          </Link>}

      </div>

      <div>

      </div>
    </div>);
  }
}

export default ShoppingCart;