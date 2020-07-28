import React, { Component } from 'react';
import BeerRow from './BeerRow';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Beer extends Component {


    state = { beers: [], brand: "brand", type: "type", id: 0 }

    componentDidMount() {
        fetch('https://beer-on-tap-36284.herokuapp.com/beerdata')
            .then(res => res.json())
            .then((data) => {
                this.setState({ beers: data })
            })
            .catch(console.log)
    }

    setInfo() {
        this.setState({ info: !this.state.info })
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

    updateId = (e) => {
        e.preventDefault();
        var inputType = e.target.value;
        if (isNaN(inputType)) {
            console.log("WARNING: invalid Type.");
            this.setState({ id : inputType });
        } else {
            this.setState({ id: inputType });
        }
    }

    addBeer = () => {

        var brand = this.state.brand;
        var type = this.state.type;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk");
        myHeaders.append("Cookie", "JSESSIONID=C3C579873A1FF3A29B2414E96492CAC0");

        var raw = JSON.stringify({ "brand": brand, "type": type });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://beer-on-tap-36284.herokuapp.com/beerdata", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))
            .then(window.location.reload());
    }

    sendUpdate = () => {
        var brand = this.state.brand;
        var type = this.state.type;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk");
        myHeaders.append("Cookie", "JSESSIONID=98AF4687652A48D576C268ABDAFF3E99");

        var raw = JSON.stringify({ "brand": brand, "type": type });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://beer-on-tap-36284.herokuapp.com/beerdata/" + this.state.id, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(window.location.reload())
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div>
                <div className="t_header" > What's on Tap?  </div>
                <table className="table">
                    <tbody>
                        <tr className="rows_h">
                            <th>Tap ID</th>
                            <th>Brand</th>
                            <th>Type</th>
                        </tr>
                        {this.state.beers.map((beer) => (
                            <BeerRow key={beer.id} id={beer.id} brand={beer.brand} type={beer.type} />
                        ))}
                    </tbody>
                </table>
                <div className="beerWrapper">
                    Add a Beer!
                    <div className="inputs">
                        Enter the brand: &nbsp;
                            <TextField error={!isNaN(this.state.brand)}
                            helperText={!isNaN(this.state.brand) ? "ERROR; invalid brand" : ""}
                            id="outlined-basic" label="brand" variant="outlined" onChange={this.updateBrand}
                            size="small" />
                    </div>

                    <div className="inputs">
                        Enter the type: &nbsp;
                        <TextField error={!isNaN(this.state.type)}
                            helperText={!isNaN(this.state.type) ? "ERROR; invalid type" : ""}
                            id="outlined-basic" label="type" variant="outlined" onChange={this.updateType}
                            size="small" />
                    </div>

                    <div className="button">
                        <Button variant="contained" onClick={this.addBeer}> Add to Tap! </Button>

                    </div>
                </div>
                <div className="beerWrapper">
                    Edit a Beer!
                    <div className="inputs">
                        Enter the id: &nbsp;
                            <TextField error={isNaN(this.state.id)}
                            helperText={isNaN(this.state.id) ? "ERROR; invalid id" : ""}
                            id="outlined-basic" label="id" variant="outlined" onChange={this.updateId}
                            size="small" />
                    </div>
                    <div className="inputs">
                        Enter the brand: &nbsp;
                            <TextField error={!isNaN(this.state.brand)}
                            helperText={!isNaN(this.state.brand) ? "ERROR; invalid brand" : ""}
                            id="outlined-basic" label="brand" variant="outlined" onChange={this.updateBrand}
                            size="small" />
                    </div>

                    <div className="inputs">
                        Enter the type: &nbsp;
                        <TextField error={!isNaN(this.state.type)}
                            helperText={!isNaN(this.state.type) ? "ERROR; invalid type" : ""}
                            id="outlined-basic" label="type" variant="outlined" onChange={this.updateType}
                            size="small" />
                    </div>

                    <div className="button">
                        <Button variant="contained" onClick={this.sendUpdate}> Update Tap </Button>

                    </div>
                </div>
            </div>)

    }

}
export default Beer;