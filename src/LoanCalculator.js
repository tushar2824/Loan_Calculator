import React, { Component } from 'react';

class LoanCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanAmount: '',
      interestRate: '',
      loanTerm: '',
      monthlyPayment: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  calculateMonthlyPayment = () => {
    const { loanAmount, interestRate, loanTerm } = this.state;
    if (!loanAmount || !interestRate || !loanTerm) return;

    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    this.setState({
      monthlyPayment: monthlyPayment.toFixed(2),
    });
  };

  render() {
    const { loanAmount, interestRate, loanTerm, monthlyPayment } = this.state;

    return (
      <div>
        <h1>Loan Calculator</h1>
        <div>
          <label>Loan Amount:</label>
          <input
            type="number"
            name="loanAmount"
            value={loanAmount}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Annual Interest Rate (%):</label>
          <input
            type="number"
            name="interestRate"
            value={interestRate}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Loan Term (years):</label>
          <input
            type="number"
            name="loanTerm"
            value={loanTerm}
            onChange={this.handleInputChange}
          />
        </div>
        <button onClick={this.calculateMonthlyPayment}>Calculate</button>
        {monthlyPayment && (
          <div>
            <h2>Monthly Payment:</h2>
            <p>₹{monthlyPayment}</p>
          </div>
        )}
      </div>
    );
  }
}

export default LoanCalculator;
