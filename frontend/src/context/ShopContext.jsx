import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  // Always point to an API server, not the frontend origin
  const backendUrl = 
    import.meta.env.VITE_BACKEND_URL ||
    'http://localhost:4000';
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select product size');
      return;
    }

    setCartItems((prevCart) => {
      let cartData = { ...prevCart };

      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      localStorage.setItem('cartItems', JSON.stringify(cartData));
      return cartData;
    });

    toast.success('Item added to cart');
    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
    localStorage.setItem('cartItems', JSON.stringify(cartData));

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, {
          itemId,
          size,
          quantity,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error('Failed to sync update:', error.message);
        toast.error('Error updating cart');
      }
    }
  };

  const removeFromCart = async (itemId, size) => {
    const updatedCart = { ...cartItems };

    if (updatedCart[itemId]) {
      delete updatedCart[itemId][size];
      if (Object.keys(updatedCart[itemId]).length === 0) {
        delete updatedCart[itemId];
      }
    }

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, {
          itemId,
          size,
          quantity: 0,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error('Failed to sync removal:', error.message);
        toast.error('Error removing item from cart');
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, itemSizes) => {
      return total + Object.values(itemSizes).reduce((sum, count) => sum + count, 0);
    }, 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalAmount += itemInfo.price * cartItems[itemId][size];
          }
        } catch (error) {
          console.error('Error calculating total:', error.message);
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data && response.data.products) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("🚨 Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
