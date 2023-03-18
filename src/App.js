import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";

import "./App.css";

const App = () => {
  const [trades, setTrades] = useState([]);
  const [coin, setCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [deletedTrade, setDeletedTrade] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (deletedTrade !== null) {
      setDeletedTrade(null);
    }
  }, [deletedTrade]);
  

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
  
  

  function handleClick(trade) {
    setSelected(trade);
  }

  function setSelectedTrade(trade) {
    // Update the state with the selected trade
    setSelected(trade);
  }

  
  return (

      <div className="crypto-tracker">
        <h1>Crypto Tracker</h1>
        <h2> Welcome aboard! </h2>
<p> Track your cryptocurrency prices and trends. </p>
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
    </div>
  );
  

}; export default App;
