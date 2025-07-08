const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const currencyData = [
  { currency: 'AUD', amount: '1,100.00' },
  { currency: 'MYR', amount: '899.00' },
  { currency: 'GBP', amount: '56,000.00' },
  { currency: 'EUR', amount: '5.388,00' },
];

/// Parse amount string to number
function parseAmount(str) {
  return parseFloat(str.replace(/,/g, '').replace(/\./g, ''));
}



function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid API Key' });
  }
}

// POST /calculate
app.post('/calculate', validateApiKey, (req, res) => {
  const { expression } = req.body;

  
 
  if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
    return res.status(400).json({ error: 'Invalid characters in expression' });
  }

  try {
    const result = eval(expression);
    res.json({ result });
  } catch (e) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

// POST /currency
app.get('/currency', (req, res) => {
  const { sortColumn, sortOrder } = req.query;

  // Validate input
  const allowedColumns = ['currency', 'amount'];
  if (!sortColumn || !allowedColumns.includes(sortColumn)) {
    return res.status(400).json({ error: 'Invalid sort column' });
  }

  if (!sortOrder || !['asc', 'desc'].includes(sortOrder)) {
    return res.status(400).json({ error: 'Invalid sort order' });
  }

  // Sort data
  const sorted = [...currencyData].sort((a, b) => {
    let valA, valB;

    if (sortColumn === 'currency') {
      valA = a.currency;
      valB = b.currency;
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    }

    if (sortColumn === 'amount') {
      valA = parseAmount(a.amount);
      valB = parseAmount(b.amount);
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    }

    return 0;
  });
  console.log(sorted,'susun');
  res.json(sorted);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on https://localhost:${process.env.PORT}`); 
});