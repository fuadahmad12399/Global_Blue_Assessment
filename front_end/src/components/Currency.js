import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';


const initialData = [
  { currency: 'AUD', amount: '1,100.00' },
  { currency: 'MYR', amount: '899.00' },
  { currency: 'GBP', amount: '56,000.00' },
  { currency: 'EUR', amount: '5.388,00' },
];

export default function CurrencyGrid() {
  const [data, setData] = useState(initialData)
  const [sortConfig, setSortConfig] = useState({
    column: 'currency',
    order: 'asc',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (column, order) => {
    setLoading(true);
    setError(null);

    const url = new URL('http://localhost:5000/currency');
    if (column && order) {
      url.searchParams.append('sortColumn', column);
      url.searchParams.append('sortOrder', order);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch sorted data');
      const result = await response.json();
      setData(result); 
    } catch (err) {
      setError(err.message);
   
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    const newOrder =
      sortConfig.column === column && sortConfig.order === 'asc'
        ? 'desc'
        : 'asc';
    setSortConfig({ column, order: newOrder });
    fetchData(column, newOrder);
  };

  useEffect(() => {
    fetchData(sortConfig.column, sortConfig.order);
  }, []);

  return (
    <div>
      <h2>Currency Grid</h2>
      {loading && <p>Loading sorted data...</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th onClick={() => handleSort('currency')}>Currency</th>
            <th onClick={() => handleSort('amount')}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.currency}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button>
        <Link to="/">Back to Calculator</Link>
      </button>
    </div>
  );
}