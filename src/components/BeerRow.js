import React, { Component } from 'react';
import '../App.css';


class BeerRow extends Component {

    state = {
        id: this.props.id,
        brand: this.props.brand,
        type: this.props.type,
    }


    setInfo() {
        this.setState({ info: !this.state.info })
    }

    sendDelete() {
        var temp = this.state.id;
        console.log("deleting " + temp);

        setTimeout(() => { console.log("flightID is now: " + this.state.id); }, 500);
    }

    updateBrand = (e) => {
        e.preventDefault();
        var inputBrand = e.target.value;
        if (!isNaN(inputBrand)) {
            console.log("WARNING: Brand can't be a Number");
            this.setState({ brand: inputBrand });
        } else {
            this.setState({ brand: inputBrand });
        }
    }

    updateType = (e) => {
        e.preventDefault();
        var inputType = e.target.value;
        if (!isNaN(inputType)) {
            console.log("WARNING: invalid Type.");
            this.setState({ type: inputType });
        } else {
            this.setState({ type: inputType });
        }
    }

    render() {
        return (
            <tr className="rows">
                <td>{this.state.id}</td>
                <td>{this.state.brand}</td>
                <td>{this.state.type}</td>
            </tr>
        )
    }

}



export default BeerRow;