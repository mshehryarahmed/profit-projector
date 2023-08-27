import './App.css';
import React, { useState } from 'react';

class Record {
  constructor(serial, principalAmount, profitRate, expensePercent) {
    this.serial = serial;
    this.principalAmount = principalAmount;
    this.profitRate = profitRate;
    this.expensePercent = expensePercent;
    this.netMonthlyProfit = principalAmount * profitRate;
    this.expenseAmount = principalAmount * profitRate * expensePercent;
    this.depositAmount = principalAmount * profitRate * (1 - expensePercent);
    this.newBalance = principalAmount + (principalAmount * profitRate * (1 - expensePercent));
  }

  getBalance() {
    return this.newBalance;
  }
}

class Calculation {
  constructor(months = 120, profitRate = 18.5, principalAmount = 10000000, expensePercent = 25) {
    this.months = months;
    this.profitRate = profitRate / 100 / 12;
    this.principalAmount = principalAmount;
    this.expensePercent = expensePercent / 100;
    this.records = [];
    for (let i = 0; i < months; ++i) {
      this.records[i] = new Record(i + 1, this.principalAmount, this.profitRate, this.expensePercent);
      this.principalAmount = this.records[i].getBalance();
    }
  }
  getRecords() {
    return this.records;
  }
}

function Input({ setRecords }) {
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
    const { months, profitRate, principalAmount, expensePercent } = formData;
    const calcualtion = new Calculation(months, profitRate, principalAmount, expensePercent);
    setRecords(calcualtion.getRecords());
  };

  return (
    <div>
      <form className='styled-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='months'>Months:</label>
          <input
            type='number'
            id='months'
            name='months'
            placeholder='Months'
            value={formData.months}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='profitRate'>Profit Rate:</label>
          <input
            type='number'
            id='profitRate'
            name='profitRate'
            placeholder='Profit Rate'
            value={formData.profitRate}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='principalAmount'>Principal Amount:</label>
          <input
            type='number'
            id='principalAmount'
            name='principalAmount'
            placeholder='Principal Amount'
            value={formData.principalAmount}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='expensePercent'>Monthly Expense (% of Declared Profit):</label>
          <input
            type='number'
            id='expensePercent'
            name='expensePercent'
            placeholder='Monthly Expense (% of Declared Profit)'
            value={formData.expensePercent}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>Calculate</button>
      </form>
    </div>
  );
}

function Output({ records }) {
  if (!records) {
    return null;
  }
  else return (
    <div className='content'>
      <div className='header'>
        <div>
          <div>Month</div>
          <div>Opening Account Balance</div>
          <div>Net Monthly Profit</div>
          <div>Successive Deposit</div>
          <div>Expense Amount</div>
          <div>Closing Account Balance</div>
        </div>
      </div>
      <div className='data'>
        {records.map((record) => (
          <div className='record' key={record.serial}>
            <div className='serial'>{Math.round(record.serial)}</div>
            <div className='principalAmount'>{Math.round(record.principalAmount)}</div>
            <div className='netMonthlyProfit'>{Math.round(record.netMonthlyProfit)}</div>
            <div className='depositAmount'>{Math.round(record.depositAmount)}</div>
            <div className='expenseAmount'>{Math.round(record.expenseAmount)}</div>
            <div className='newBalance'>{Math.round(record.newBalance)}</div>
          </div>
        ))}
        <div className='record summation'>
          <div></div>
          <div></div>
          <div>&Sigma;= {records.reduce((total, record) => total + Math.round(record.netMonthlyProfit), 0)}</div>
          <div>&Sigma;= {records.reduce((total, record) => total + Math.round(record.depositAmount), 0)}</div>
          <div>&Sigma;= {records.reduce((total, record) => total + Math.round(record.expenseAmount), 0)}</div>
          <div></div>
        </div>
        <div className='record final'>
          Total Net Value (Final Account Balance + Total Expense Amount)= {Math.round(records.reduce((total, record) => total + Math.round(record.expenseAmount), 0)+ records[records.length-1].newBalance)}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [records, setRecords] = useState();

  return (
    <div className="App">
      <h1>Compound Interest Projection</h1>
      <Input setRecords={setRecords} />
      <Output records={records} />
    </div>
  );
}

export default App;