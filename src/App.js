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

  // Popular makes list
  const popularMakes = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW"];
  const popularOptions = popularMakes.filter((make) => makes.includes(make));
  const otherOptions = makes.filter((make) => !popularMakes.includes(make));

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
  };

  const labelStyle = {
    width: 100,
    fontWeight: "bold",
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Select Vehicle Info</h2>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
        <div style={{ maxWidth: 400 }}>
          <div style={rowStyle}>
            <label style={labelStyle}>Make:</label>
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">-- Select Make --</option>
              {popularOptions.length > 0 && (
                <optgroup label="Popular Makes">
                  {popularOptions.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </optgroup>
              )}
              {otherOptions.length > 0 && (
                <optgroup label="All Other Makes">
                  {otherOptions.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Model:</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!models.length}
            >
              <option value="">-- Select Model --</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              disabled={!types.length}
            >
              <option value="">-- Select Type --</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Country:</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              disabled={!countries.length}
            >
              <option value="">-- Select Country --</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div style={rowStyle}>
            <label style={labelStyle}>Engine:</label>
            <select
              value={selectedEngine}
              onChange={(e) => setSelectedEngine(e.target.value)}
              disabled={!engines.length}
            >
              <option value="">-- Select Engine --</option>
              {engines.map((engine) => (
                <option key={engine} value={engine}>
                  {engine}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image + sparkles */}
        <div style={{ marginTop: 12, position: "relative", width: 150 }}>
          <img
            src="/images/bun.png"
            alt="Bun"
            style={{
              width: 150,
              borderRadius: 12,
              boxShadow: "0 0 10px rgba(0,0,0,0.25)",
              transform: "rotate(2deg)",
              display: "block",
            }}
          />

          <style>
            {`
              @keyframes sparkle {
                0% { transform: scale(0.5) rotate(0deg); opacity: 0; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
                100% { transform: scale(0.5) rotate(360deg); opacity: 0; }
              }

              .sparkle {
                position: absolute;
                width: 16px;
                height: 16px;
                background: yellow;
                box-shadow: 0 0 12px 4px gold;
                opacity: 0;
                animation: sparkle 2s infinite ease-in-out;
                transform: rotate(45deg);
                clip-path: polygon(
                  50% 0%,
                  60% 35%,
                  100% 35%,
                  68% 57%,
                  80% 100%,
                  50% 75%,
                  20% 100%,
                  32% 57%,
                  0% 35%,
                  40% 35%
                );
              }

              .sparkle1 { top: -10px; left: 10px; animation-delay: 0s; }
              .sparkle2 { top: 20px; right: -10px; animation-delay: 0.5s; }
              .sparkle3 { bottom: -10px; left: 30px; animation-delay: 1s; }
              .sparkle4 { bottom: 10px; right: 0px; animation-delay: 1.5s; }
            `}
          </style>

          <div className="sparkle sparkle1"></div>
          <div className="sparkle sparkle2"></div>
          <div className="sparkle sparkle3"></div>
          <div className="sparkle sparkle4"></div>
        </div>
      </div>

      {taxPrices && (
        <div style={{ marginTop: 50 }}>
          <h2>Tax Prices</h2>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Year</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(taxPrices).map(([year, price]) => (
                <tr key={year}>
                  <td>{year}</td>
                  <td>
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

      <div style={{ marginTop: 60, textAlign: "center" }}>
        <style>
          {`
            @keyframes pulse {
              0% {
                transform: rotate(-2deg) scale(1);
                text-shadow: 2px 2px 0 black;
              }
              50% {
                transform: rotate(-2deg) scale(1.2);
                text-shadow: 4px 4px 10px red;
              }
              100% {
                transform: rotate(-2deg) scale(1);
                text-shadow: 2px 2px 0 black;
              }
            }
          `}
        </style>

        <h1
          style={{
            fontSize: "36px",
            color: "#ff0055",
            fontWeight: "900",
            letterSpacing: "2px",
            animation: "pulse 1s ease-in-out infinite",
            display: "inline-block",
          }}
        >
          WEBSITE CREATED BY THE BIGGEST BADDEST FRESHEST ALL-MIGHTY BUNKEATH MENG 💥🔥
        </h1>
      </div>
    </div>
  );
}

export default App;
