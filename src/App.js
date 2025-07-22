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

  const API_BASE = "https://khmax-backend.onrender.com";

  useEffect(() => {
    fetch(`${API_BASE}/makes`)
      .then(res => res.json())
      .then(data => {
        setMakes(data);
        if (data.length === 1) setSelectedMake(data[0]);
      });
  }, []);

  useEffect(() => {
    if (selectedMake) {
      fetch(`${API_BASE}/models?make=${selectedMake}`)
        .then(res => res.json())
        .then(data => {
          setModels(data);
          if (data.length === 1) setSelectedModel(data[0]);
        });
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
        .then(data => {
          setTypes(data);
          if (data.length === 1) setSelectedType(data[0]);
        });
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
        .then(data => {
          setCountries(data);
          if (data.length === 1) setSelectedCountry(data[0]);
        });
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
        .then(data => {
          setEngines(data);
          if (data.length === 1) setSelectedEngine(data[0]);
        });
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
          engine: selectedEngine,
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

  const popularMakes = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW"];
  const popularOptions = popularMakes.filter((make) => makes.includes(make));
  const otherOptions = makes.filter((make) => !popularMakes.includes(make));

  const wrapperStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: 800,
    margin: "0 auto",
    padding: 20,
    color: "#333",
  };

  const bannerStyle = {
    background: "#2c3e50",
    color: "#fff",
    padding: "20px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "0 0 8px 8px",
    marginBottom: 40,
  };

  const logoStyle = {
    fontSize: 24,
    fontWeight: "bold",
  };

  const navStyle = {
    display: "flex",
    gap: 20,
  };

  const linkStyle = {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: 16,
  };

  const formGroup = {
    marginBottom: 20,
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: 6,
  };

  const selectStyle = {
    width: "100%",
    padding: 8,
    fontSize: 14,
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 30,
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: 10,
    textAlign: "left",
  };

  return (
    <div style={wrapperStyle}>
      <header style={bannerStyle}>
        <div style={logoStyle}>Khmer Car Tax Lookup</div>
        <nav style={navStyle}>
          <a href="/" style={linkStyle}>Home</a>
          <a href="/about" style={linkStyle}>About</a>
          <a href="/contact" style={linkStyle}>Contact</a>
        </nav>
      </header>

      <h2>Select Vehicle Info</h2>

      <div>
        <div style={formGroup}>
          <label style={labelStyle}>Make</label>
          <select
            style={selectStyle}
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">-- Select Make --</option>
            {popularOptions.length > 0 && (
              <optgroup label="Popular Makes">
                {popularOptions.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </optgroup>
            )}
            {otherOptions.length > 0 && (
              <optgroup label="Other Makes">
                {otherOptions.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </optgroup>
            )}
          </select>
        </div>

        <div style={formGroup}>
          <label style={labelStyle}>Model</label>
          <select
            style={selectStyle}
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!models.length}
          >
            <option value="">-- Select Model --</option>
            {models.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div style={formGroup}>
          <label style={labelStyle}>Type</label>
          <select
            style={selectStyle}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            disabled={!types.length}
          >
            <option value="">-- Select Type --</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={formGroup}>
          <label style={labelStyle}>Country</label>
          <select
            style={selectStyle}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            disabled={!countries.length}
          >
            <option value="">-- Select Country --</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div style={formGroup}>
          <label style={labelStyle}>Engine</label>
          <select
            style={selectStyle}
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            disabled={!engines.length}
          >
            <option value="">-- Select Engine --</option>
            {engines.map((engine) => (
              <option key={engine} value={engine}>{engine}</option>
            ))}
          </select>
        </div>
      </div>

      {taxPrices && (
        <div style={{ marginTop: 55 }}>
          <h2 style={{ marginBottom: 5 }}>Tax Prices</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>Year</th>
                <th style={thTdStyle}>Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(taxPrices).map(([year, price]) => (
                <tr key={year}>
                  <td style={thTdStyle}>{year}</td>
                  <td style={thTdStyle}>
                    {price != null
                      ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(price)
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
