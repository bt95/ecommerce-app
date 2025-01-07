import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  name: string;
  inventory_count: number;
}

const Store = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const handlePurchase = async () => {
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }

    try {
      const product = products.find(
        (product) => product.id === selectedProduct
      );

      if (!product) {
        toast.error("Product not found");
        return;
      }

      const response = await fetch(
        `http://localhost:3001/api/products/${selectedProduct}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventory_count: product?.inventory_count - quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Purchase successful");
      setProducts(
        products.map((product) =>
          product.id === selectedProduct
            ? {
                ...product,
                inventory_count: product.inventory_count - quantity,
              }
            : product
        )
      );
    } catch (error) {
      console.error("Error purchasing product:", error);
      toast.error("Failed to purchase product. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-2xl font-bold mb-4">Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">
                In stock: {product.inventory_count}
              </p>
              <button
                className={`mt-2 px-4 py-2 rounded ${
                  selectedProduct === product.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedProduct(product.id)}
              >
                {selectedProduct === product.id ? "Selected" : "Select"}
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-700">No products available.</div>
        )}
      </div>
      {selectedProduct && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Selected Product</h2>
          <p>
            {products.find((product) => product.id === selectedProduct)?.name}
          </p>
          <label className="block mt-4">
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={
                products.find((product) => product.id === selectedProduct)
                  ?.inventory_count
              }
              className="ml-2 border rounded p-1"
            />
          </label>
          <button
            onClick={handlePurchase}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Buy
          </button>
        </div>
      )}
    </div>
  );
};

export default Store;
