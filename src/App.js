import React, { Component } from 'react';
//import './App.css';
import axios from 'axios';
import './cryp.css';
var NumberFormat = require('react-number-format');


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptos: []
    }
    this.fetchResult = this.fetchResult.bind(this)
  }

  fetchResult = () => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EOS,XRP,LTC,NEO,BCH,ZEC,TRX,DASH&tsyms=INR,USD')
    .then(res => {
      const cryptos = res.data;
      console.log(cryptos)
      this.setState({cryptos: cryptos});
    })}

  componentDidMount() {
    this.fetchResult()
    setInterval(this.fetchResult,10000)
  }

  render() {
    return (
      <div className="App">
        <h1>Cryptocurrency</h1>
        <h4>(Updated every 10 seconds)</h4>

        {Object.keys(this.state.cryptos).map((key) => (

          <div id="crypto-container">
            <span className="left">{key}</span>
            <span className="right"><NumberFormat value={this.state.cryptos[key].INR} displayType={'text'} decimalPrecision={2} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹'} /></span>
            <span className="middle"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'} /></span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
