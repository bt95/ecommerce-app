import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  name: string;
  inventory_count: number;
}

const StoreDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newInventoryCount, setNewInventoryCount] = useState<number>(0);

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

  const handleUpdate = async () => {
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${selectedProduct}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            inventory_count: newInventoryCount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Product updated successfully");
      setProducts(
        products.map((product) =>
          product.id === selectedProduct
            ? {
                ...product,
                name: newName,
                inventory_count: newInventoryCount,
              }
            : product
        )
      );
      setSelectedProduct("");
      setNewName("");
      setNewInventoryCount(0);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again later.");
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
      <h1 className="text-2xl font-bold mb-4">Store Dashboard</h1>
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
                onClick={() => {
                  setSelectedProduct(product.id);
                  setNewName(product.name);
                  setNewInventoryCount(product.inventory_count);
                }}
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
          <label className="block mt-4">
            Name:
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="ml-2 border rounded p-1"
            />
          </label>
          <label className="block mt-4">
            Inventory Count:
            <input
              type="number"
              value={newInventoryCount}
              onChange={(e) => setNewInventoryCount(Number(e.target.value))}
              min="0"
              className="ml-2 border rounded p-1"
            />
          </label>
          <button
            onClick={handleUpdate}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default StoreDashboard;
