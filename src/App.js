import React, { useEffect, useState } from "react";

function App() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [types, setTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [engines, setEngines] = useState([]);

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const [taxPrices, setTaxPrices] = useState(null);

  const API_BASE = "https://khmax-backend.onrender.com"; // Flask runs on port 5000

  useEffect(() => {
    fetch(`${API_BASE}/makes`)
      .then(res => res.json())
      .then(setMakes);
  }, []);

  useEffect(() => {
    if (selectedMake) {
      fetch(`${API_BASE}/models?make=${selectedMake}`)
        .then(res => res.json())
        .then(setModels);
    } else {
      setModels([]);
    }
    setSelectedModel("");
    setTypes([]);
    setSelectedType("");
    setCountries([]);
    setSelectedCountry("");
    setEngines([]);
    setSelectedEngine("");
    setTaxPrices(null);
  }, [selectedMake]);

  useEffect(() => {
    if (selectedMake && selectedModel) {
      fetch(`${API_BASE}/types?make=${selectedMake}&model=${selectedModel}`)
        .then(res => res.json())
        .then(setTypes);
    } else {
      setTypes([]);
    }

    setSelectedType("");
    setCountries([]);
    setSelectedCountry("");
    setEngines([]);
    setSelectedEngine("");
    setTaxPrices(null);
  }, [selectedMake, selectedModel]);

  useEffect(() => {
    if (selectedMake && selectedModel && selectedType) {
      fetch(`${API_BASE}/countries?make=${selectedMake}&model=${selectedModel}&type=${selectedType}`)
        .then(res => res.json())
        .then(setCountries);
    } else {
      setCountries([]);
    }
    setSelectedCountry("");
    setEngines([]);
    setSelectedEngine("");
    setTaxPrices(null);
  }, [selectedMake, selectedModel, selectedType]);

  useEffect(() => {
    if (selectedMake && selectedModel && selectedType && selectedCountry) {
      fetch(`${API_BASE}/engines?make=${selectedMake}&model=${selectedModel}&type=${selectedType}&country=${selectedCountry}`)
        .then(res => res.json())
        .then(setEngines);
    } else {
      setEngines([]);
    }
    setSelectedEngine("");
    setTaxPrices(null);
  }, [selectedMake, selectedModel, selectedType, selectedCountry]);

  useEffect(() => {
  const fetchTaxPrices = async () => {
    if (selectedMake && selectedModel && selectedType && selectedCountry && selectedEngine) {
      const params = new URLSearchParams({
        make: selectedMake,
        model: selectedModel,
        type: selectedType,
        country: selectedCountry,
        engine: selectedEngine
      });

      const res = await fetch(`${API_BASE}/tax_prices?${params}`);
      const data = await res.json();

      if (!data.error) {
        setTaxPrices(data);
      } else {
        setTaxPrices(null);
      }
    } else {
      setTaxPrices(null);
    }
  };

  fetchTaxPrices();
}, [selectedMake, selectedModel, selectedType, selectedCountry, selectedEngine]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Select Vehicle Info</h2>

      <label>Make:</label>
      <select value={selectedMake} onChange={e => setSelectedMake(e.target.value)}>
        <option value="">-- Select Make --</option>
        {makes.map(make => <option key={make} value={make}>{make}</option>)}
      </select>

      <br /><br />

      <label>Model:</label>
      <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} disabled={!models.length}>
        <option value="">-- Select Model --</option>
        {models.map(model => <option key={model} value={model}>{model}</option>)}
      </select>

      <br /><br />

      <label>Type:</label>
      <select value={selectedType} onChange={e => setSelectedType(e.target.value)} disabled={!types.length}>
        <option value="">-- Select Type --</option>
        {types.map(type => <option key={type} value={type}>{type}</option>)}
      </select>

      <br /><br />

      <label>Country:</label>
      <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} disabled={!countries.length}>
        <option value="">-- Select Country --</option>
        {countries.map(country => <option key={country} value={country}>{country}</option>)}
      </select>

      <br /><br />

      <label>Engine:</label>
      <select value={selectedEngine} onChange={e => setSelectedEngine(e.target.value)} disabled={!engines.length}>
        <option value="">-- Select Engine --</option>
        {engines.map(engine => <option key={engine} value={engine}>{engine}</option>)}
      </select>

      {taxPrices && (
        <div style={{ marginTop: 20 }}>
          <h3>Tax Prices (2016–2025)</h3>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                {Object.keys(taxPrices).map(year => (
                  <th key={year}>{year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(taxPrices).map((price, index) => (
                  <td key={index}>
                    {price != null ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price) : '—'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div style={{ marginTop: 60, textAlign: "center" }}>
        <h1 style={{
          fontSize: "36px",
          color: "#ff0055",
          textShadow: "2px 2px 0 black",
          fontWeight: "900",
          letterSpacing: "2px",
          transform: "rotate(-2deg)"
        }}>
          WEBSITE CREATED BY THE BIGGEST BADDEST FRESHEST ALL-MIGHTY BUNKEATH MENG 💥🔥
        </h1>
      </div>
    </div>
  );
}

export default App;