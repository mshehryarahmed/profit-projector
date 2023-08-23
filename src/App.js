import './App.css';
import React, { useState } from 'react';

function Input() {
  const [formData, setFormData] = useState({
    months: 120,
    profitRate: 18.5,
    principalAmount: 10000000,
    expensePercent: 25,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract form data from the state object
    const { months, profitRate, principalAmount, expensePercent } = formData;

    // Perform calculations or actions with the input values here
    // Adjust the calculations as needed for your specific use case

    const monthlyInterestRate = profitRate / 100 / 12;
    const compoundedAmount = principalAmount * Math.pow(1 + monthlyInterestRate, months);

    // Now you can use 'compoundedAmount' and other calculated values as needed
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          name='months'
          placeholder='Months'
          value={formData.months}
          onChange={handleInputChange}
        />
        <input
          type='number'
          name='profitRate'
          placeholder='Profit Rate'
          value={formData.profitRate}
          onChange={handleInputChange}
        />
        <input
          type='number'
          name='principalAmount'
          placeholder='Principal Amount'
          value={formData.principalAmount}
          onChange={handleInputChange}
        />
        <input
          type='number'
          name='expensePercent'
          placeholder='Monthly Expense (% of Declared Profit)'
          value={formData.expensePercent}
          onChange={handleInputChange}
        />
        <button type='submit'>Calculate</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Input />
    </div>
  );
}

export default App;
