import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Power Bank", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id) {
    setItems((items) => 
      items.map((item) =>
        item.id === id ? {...item, packed: !item.packed } : item
      )
    );    
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList 
        items={items} 
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
        />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>🧳 Jalan Jalan cuyy 🛫</h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);  

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Mari Checklist Barang 😁✏️</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input 
        type="text" 
        placeholder="Barang yang dibawa" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Bawa</button>
    </form>
  );  
}


function PackingList({ items, onDeleteItem, onUpdateItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item 
          item={item} 
          key={item.id} 
          onDeleteItem={onDeleteItem}   
          onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdateItem(item.id)}
        />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {

  if (!items.length)
    return (
     <p className="stats">
      <em>Mulai Tambahkan Barang Bawaan Anda</em>
     </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);  

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "Kamu Siap Berangkat 🛺🚕"
          : `👜 Kamu punya ${numItems} barang di daftar, dan sudah packing ${numPacked}
       barang (${percentage}%)`}
      </em>
    </footer>
  );
}