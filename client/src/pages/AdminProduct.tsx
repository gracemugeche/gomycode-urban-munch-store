import { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/ProductService";
import { useAuth } from "../hooks/useAuth";
import type { Product } from "../types/product";
import AdminLayout from "../layout/AdminLayout";

const AdminProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("groceries");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const { token } = useAuth();

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async () => {
    const parsedPrice = parseFloat(price);
    if (!name || !image || !description || isNaN(parsedPrice)) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (!token) return;

    if (editId) {
      await updateProduct(editId, { name, price: parsedPrice, category, image, description }, token);
      setEditId(null);
    } else {
      await createProduct({ name, price: parsedPrice, category, image, description }, token);
    }

    // Reset form
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
    setCategory("groceries");
    await loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    await deleteProduct(id, token);
    await loadProducts();
  };

  const handleEdit = (product: Product) => {
    setName(product.name);
    setPrice(String(product.price));
    setImage(product.image);
    setDescription(product.description);
    setCategory(product.category);
    setEditId(product._id);
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">
          {editId ? "Edit Product" : "Add Product"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2 rounded"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border p-2 rounded"
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            className="border p-2 rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="groceries">Groceries</option>
            <option value="meals">Meals</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mt-4 w-full rounded"
        />
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            {editId ? "Update" : "Create"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setName("");
                setPrice("");
                setImage("");
                setDescription("");
                setCategory("groceries");
              }}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="border rounded-xl p-4 shadow-sm bg-white">
              <img src={p.image} alt={p.name} className="h-40 w-full object-cover rounded mb-2" />
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm mb-1 text-gray-600">{p.description}</p>
              <p className="text-sm font-medium text-purple-600">${p.price.toFixed(2)}</p>
              <p className="text-xs italic text-gray-400">{p.category}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-purple-500 text-white px-3 py-1 text-sm rounded hover:bg-purple-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProductPage;
