import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import bitcoinLogo from "./bitcoin-logo.png";
import "./styles.css"


import "./App.css";

const App = () => {
  const [trades, setTrades] = useState(() => {
    const storedTrades = localStorage.getItem("trades");
    return storedTrades ? JSON.parse(storedTrades) : [];
  });
  const [coin, setCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [deletedTrade, setDeletedTrade] = useState(null);
  const [selected, setSelected] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [animationState, setAnimationState] = useState(false);
  const [key, setKey] = useState(0);



  useEffect(() => {
    if (deletedTrade !== null) {
      setDeletedTrade(null);
    }
  
    const intervalId = setInterval(() => {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd&include_24hr_change=true&api_key=YOUR_API_KEY"
      )
        .then((response) => response.json())
        .then((data) => {
          const btcPrice = data.bitcoin.usd.toFixed(2);
          const btcChange = data.bitcoin.usd_24h_change.toFixed(2);
          const ethPrice = data.ethereum.usd.toFixed(2);
          const ethChange = data.ethereum.usd_24h_change.toFixed(2);
          const xrpPrice = data.ripple.usd.toFixed(2);
          const xrpChange = data.ripple.usd_24h_change.toFixed(2);
  
          document.getElementById("btc-price").textContent = `$${btcPrice}`;
          document.getElementById("btc-change").textContent = `${btcChange}%`;
          document.getElementById("eth-price").textContent = `$${ethPrice}`;
          document.getElementById("eth-change").textContent = `${ethChange}%`;
          document.getElementById("xrp-price").textContent = `$${xrpPrice}`;
          document.getElementById("xrp-change").textContent = `${xrpChange}%`;
        })
        .catch((error) => console.error(error));
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [deletedTrade]);
  
  useEffect(() => {
    const handleMouseClick = (event) => {
      setLogoPosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("click", handleMouseClick);
    return () => {
      document.removeEventListener("click", handleMouseClick);
    };
  }, []);


  const addTrade = (e) => {
    e.preventDefault();
    if (coin === "" || quantity === "" || price === "") return;
  
    const newTrade = {
      id: Math.floor(Math.random() * 1000),
      coin: coin,
      quantity: quantity,
      price: price,
      timestamp: new Date().toLocaleString(),
    };
  
    setTrades([...trades, newTrade]);
    setCoin("");
    setQuantity("");
    setPrice("");
  
    localStorage.setItem("trades", JSON.stringify([...trades, newTrade]));
  };
  
  function deleteTrade(trade) {
    const row = document.querySelector(`#row-${trade.id}`);
    if (row) {
      const rowAnimation = row.animate(
        [{ opacity: "1" }, { opacity: "0" }],
        { duration: 500, fill: "forwards" }
      );
      rowAnimation.onfinish = () => {
        const newTrades = trades.filter((t) => t.id !== trade.id);
        setTrades(newTrades);
        localStorage.setItem("trades", JSON.stringify(newTrades));
      };
    }
  }
  
  const handleDelete = (trade) => {
    deleteTrade(trade);
  };

  const handleMouseClick = (e) => {
    setKey((prevKey) => prevKey + 1);
    setLogoPosition({ x: e.clientX - 25, y: e.clientY - 25 });
  };
  

  


  function handleClick(trade) {
    setSelected(trade);
  }

  function setSelectedTrade(trade) {
    // Update the state with the selected trade
    setSelected(trade);
  }

  //const cryptoTable = document.getElementById('crypto-table');

fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd&include_24hr_change=true&api_key=YOUR_API_KEY')
  .then(response => response.json())
  .then(data => {
    const btcPrice = data.bitcoin.usd.toFixed(2);
    const btcChange = data.bitcoin.usd_24h_change.toFixed(2);
    const ethPrice = data.ethereum.usd.toFixed(2);
    const ethChange = data.ethereum.usd_24h_change.toFixed(2);
    const xrpPrice = data.ripple.usd.toFixed(2);
    const xrpChange = data.ripple.usd_24h_change.toFixed(2);

    document.getElementById('btc-price').textContent = `$${btcPrice}`;
    document.getElementById('btc-change').textContent = `${btcChange}%`;
    document.getElementById('eth-price').textContent = `$${ethPrice}`;
    document.getElementById('eth-change').textContent = `${ethChange}%`;
    document.getElementById('xrp-price').textContent = `$${xrpPrice}`;
    document.getElementById('xrp-change').textContent = `${xrpChange}%`;
  })
  .catch(error => console.error(error));


  return (



      <div className="crypto-tracker">
        

        <link rel="stylesheet" type="text/css" href="styles.css"></link>

        <h1>Crypto Tracker</h1>
        <h2> Welcome aboard! </h2>
      
    

    <script> "App.js"</script>
<p> Track your cryptocurrency prices and trends. </p>



<table id="crypto-table">
  
  <thead>
    
    <tr>
      <th>Cryptocurrency</th>
      <th>Price</th>
      <th>24h Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bitcoin (BTC)</td>
      <td id="btc-price"></td>
      <td id="btc-change"></td>
    </tr>
    <tr>
      <td>Ethereum (ETH)</td>
      <td id="eth-price"></td>
      <td id="eth-change"></td>
    </tr>
    <tr>
      <td>Ripple (XRP)</td>
      <td id="xrp-price"></td>
      <td id="xrp-change"></td>
    </tr>
  </tbody>
</table>
        <form onSubmit={addTrade}>
  
        <div className="input-container">
    <div className="input-group">
      <label htmlFor="coin">Coin</label>
      <input
        type="text"
        id="coin"
        value={coin}
        onChange={(e) => setCoin(e.target.value)}
      />
    </div>
    <div className="input-group">
      <label htmlFor="quantity">Quantity</label>
      <input
        type="text"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>
    <div className="input-group">
      <label htmlFor="price">Price</label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
    </div>

        <button type="submit">Add Trade</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <motion.tr
              key={trade.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                y: 100,
                scale: 0.5,
                transition: { duration: 1.5 },
              }}
              id={`row-${trade.id}`}
              className="table-row"
            >
              <td>{trade.coin}</td>
              <td>{trade.quantity}</td>
              <td>{trade.price}</td>
              <td>{trade.timestamp}</td>
              <td>
                <motion.button
                  className="delete-btn"
                  onClick={() => handleDelete(trade)}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AiOutlineDelete />
                  Delete
                </motion.button>
              </td>
            </motion.tr>
            
          ))}
        </tbody>
      </table>
      <div onClick={handleMouseClick}
  style={{
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0
  }}
>
  <motion.img
    key={key}
    src={bitcoinLogo}
    alt="Bitcoin logo"
    style={{
      position: "absolute",
      left: logoPosition.x - 10,
      top: logoPosition.y - 10,
      width: 20,
      height: 20,
    }}
    animate={{
      scale: [1, 5, 1],
      rotate: [0, 360, 0],
      opacity: [1, 0.5, 1],
    }}
    transition={{
      duration: 0.5,
    }}
  />
</div>


    </div> 
    
  );
  

}; export default App;
