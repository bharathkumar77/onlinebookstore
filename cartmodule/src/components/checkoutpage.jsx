import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class CheckOutPage extends Component {
    state = {

        cardnumber: null,
        mm: null,
        yyyy: null,
        cvv: null,
        isvalid: true
    }
    //Carddetails can be sent to any payment gateway and hence be validate and hence set the "isValid". 

    handleSubmit = (event) => {
        this.cardDetailsValidation() //A function to validate the card details 
        if (this.state.isvalid) {
            this.props.history.push("/success");
        }
        else {
            alert("Invalid credentials");
        }

    }

    cardDetailsValidation = () => {
        //this function can use the state variables and validate the card details.
    }

    render() {
        return (<div className="container">
            <div className="col-lg-6 m-auto" >

                <form className="m-5 p-3 border" onSubmit={this.handleSubmit}>
                    <legend className="text-center">Payment Info</legend>

                    <div className="form-group">
                        <label for="inputAddress">Credit / Debit Card Number</label>
                        <input type="text" className="form-control" name="cardnumber" value={this.state.cardnumber} placeholder="XXXX-XXXX-XXXX-XXXX" required
                            onChange={event => { this.setState({ cardnumber: event.target.value }) }} />
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label for="inputCity">MM</label>
                            <input type="text" className="form-control" value={this.state.mm} name="mm" placeholder="MM" required
                                onChange={event => { this.setState({ mm: event.target.value }) }} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputState">YYYY</label>
                            <input type="text" className="form-control" value={this.state.yyyy} name="yyyy" placeholder="YYYY" required
                                onChange={event => { this.setState({ yyyy: event.target.value }) }} />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputZip">CVV</label>
                            <input type="text" className="form-control" value={this.state.cvv} name="cvv" placeholder="CVV" required
                                onChange={event => { this.setState({ cvv: event.target.value }) }} />
                        </div>
                    </div>

                    <button type="submit"
                        style={{ height: "50px" }}
                        className="btn btn-success w-100  mb-2">Pay Using Card</button>
                    <br />
                </form>
                <h5 className="text-center"> OR </h5>
                <Link to="/success">
                    <button type="button"
                        style={{ height: "50px" }}
                        className="btn btn-info w-100  ">Pay Using Cash on Delivery</button>
                </Link>
                <br />
            </div>
        </div>);
    }
}

export default CheckOutPage;