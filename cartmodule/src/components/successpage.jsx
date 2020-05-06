import React from 'react';
import axios from 'axios';
class PaymentSuccessPage extends React.Component {
    state = {
        //Setting up a random OrderID and Present Date, time as the OrderID and timeOfOrder
        orderID: Math.floor(Math.random() * 1000000),
        timeOfOrder: new Date()

    }
    componentDidMount = async () => {
        //Using ComponentDidMount to store the transaction Details into the database for Future reference
        var transactionDetails = this.state;
        await axios.post("/transaction", { transactionDetails }).then((res, err) => {
            if (err)
                console.log(err)
            else
                console.log("Transaction Details Stored in Database")
        })
    }

    render() {
        //Setting up a Random date of anywhere between 3-7 for expected date of delivery
        var date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 4) + 3);
        return (<div class="container-fluid">
            <div className="col-lg-8 m-auto text-center">

                <div className="jumbotron mt-5 bg-success text-light">
                    <legend style={{ textAlign: "center", fontSize: "50px" }}>Cheers! Your order is Placed !!</legend>
                </div>
                <h4>Your ORDERID: {this.state.orderID}</h4>
                <h4>Your Order will be delivered by {date.toDateString()}</h4>
                <br />
                <h5>Your order will be delivered to you within the given date and to the address mentioned in your Order Details (Or to the address mentioned in your Profile)</h5>
                <img style={{ height: "300px", width: "30%" }} src="https://getdrawings.com/free-icon/delivery-icon-62.png" />

            </div>
        </div>);
    }
}

export default PaymentSuccessPage;