import React, { useState } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const API_KEY = 'my-secret-key-123';

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/calculate',
        { expression },
        {
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );
      setResult(response.data.result);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setResult('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Calculator</h2>
      <input
        type="text"
        placeholder="Enter expression (e.g., 2+3*4)"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        style={{ width: '300px', padding: '8px' }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: 10, padding: '8px 12px' }}>
        Calculate
      </button>

      {result !== '' && (
        <div style={{ marginTop: 20, fontSize: 18 }}>
          <strong>Result:</strong> {result}
        </div>
      )}

      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

      {/* Navigation Button */}
      <br />
      <button style={{ marginTop: 20 }}>
        <Link to="/currency">Go to Currency Grid</Link>
      </button>
    </div>
  );
}