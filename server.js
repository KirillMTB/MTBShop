const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let items = [
  {
    "name":"GT 27.5 FORCE CRB EXPERT",
    "price": "430584",
    "imageURL": "./img/gtforcesmall.jpg",
    "alt": "GT Force"
  },
  
  {
    "name":"GT 27.5 AVALANCHE COMP",
    "price": "53460",
    "imageURL": "./img/gtavalanche.jpg",
    "alt": "GT Avalanche COMP"
  },
  
  {
    "name":"CANNONDALE TRAIL SE 2",
    "price": "155246",
    "imageURL": "./img/cannondaletrail.jpg",
    "alt": "CANNONDALE TRAIL SE 2"
  },
  
  {
    "name":"CANNONDALE TRAIL SE 1",
    "price": "168620",
    "imageURL": "./img/cannondaletrailse.jpg",
    "alt": "CANNONDALE TRAIL SE 1"
  },
  
  {
    "name":"CANNONDALE F-SI CRB 4",
    "price": "323615",
    "imageURL": "./img/cannondalefsi.jpg",
    "alt": "CANNONDALE F-SI CRB 4"
  },
  
  {
    "name":"CANNONDALE SCALPEL CRB 3",
    "price": "447595",
    "imageURL": "./img/cannondalescalpel.jpg",
    "alt": "CANNONDALE SCALPEL CRB 3"
  },
  
  {
    name:'Corratec VERT ELITE',
    price: 113630,
    imageURL: './img/corratecvertelite.jpg',
    alt: 'Corratec VERT ELITE'
  },
  
  {
    name:'Outleap RADIUS PRO 29',
    price: 106700,
    imageURL: './img/outleapradiuspro.jpg',
    alt: 'Outleap RADIUS PRO 29'
  },
  {
    name:'Jamis HARDLINE C2',
    price: 640024,
    imageURL: './img/jamishardlinec2.jpg',
    alt: 'Jamis HARDLINE C2'
  },
  {
    name:'Jamis HARDLINE C3',
    price: 537660,
    imageURL: './img/jamishardline.jpg',
    alt: 'Jamis HARDLINE C3'
  }
];

let cartItems = [];
let favoriteItems = [];

items = items.map((item, index) => ({ ...item, id: index + 1 }));

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/cart', (req, res) => {
    res.json(cartItems);
});

app.get('/favorite', (req, res) => {
    res.json(favoriteItems);
});

app.post('/cart', (req, res) => {
    const newItem = { ...req.body, id: cartItems.length + 1 };
    cartItems.push(newItem);
    res.json(newItem);
});

app.post('/favorite', (req, res) => {
    const newFavoriteItem = { ...req.body, id: favoriteItems.length + 1 };
    favoriteItems.push(newFavoriteItem);
    res.json(newFavoriteItem);
});

app.delete('/cart/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    cartItems = cartItems.filter(item => item.id !== itemId);
    res.json({ success: true });
});

app.delete('/favorite/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    favoriteItems = favoriteItems.filter(item => item.id !== itemId);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});








