const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const appId = req.query.appId;
  if (!appId) {
    return res.status(400).json({ error: 'App ID is required' });
  }

  const url = `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=en`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from Steam API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Steam API' });
  }
};