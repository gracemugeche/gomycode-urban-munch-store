import { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../../services/ProductService";
import type { Product } from "../../../types/product";
import { Navigate } from "react-router-dom";
import { useAuth as useCustomAuth } from "../../../hooks/useAuth";

const AdminProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("groceries");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [useFileUpload, setUseFileUpload] = useState(true);
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { role } = useCustomAuth();

  if (role !== "admin" && role !== "worker") {
    return <Navigate to="/" replace />;
  }

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "urban_munch_preset"); 

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwwuiydrd/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    const parsedPrice = parseFloat(price);
    if (
      !name ||
      !description ||
      isNaN(parsedPrice) ||
      (!image && !imageUrlInput)
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    let imageUrl = "";
    if (useFileUpload && image) {
      try {
        imageUrl = await uploadToCloudinary(image);
      } catch (err: any) {
        console.error("Image upload failed:", err);
        return;
      }
    } else if (!useFileUpload && imageUrlInput) {
      imageUrl = imageUrlInput;
    }

    const productData = {
      name,
      price: parsedPrice,
      category,
      image: imageUrl,
      description,
    };

    try {
      if (editId) {
        await updateProduct(editId, productData, token);
      } else {
        await createProduct(productData, token);
      }

      setName("");
      setPrice("");
      setImage(null);
      setImageUrlInput("");
      setUseFileUpload(true);
      setDescription("");
      setCategory("groceries");
      setEditId(null);
      setShowModal(false);
      await loadProducts();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit product.");
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await deleteProduct(id, token);
    await loadProducts();
  };

  const handleEdit = (product: Product) => {
    setName(product.name);
    setPrice(String(product.price));
    setImage(null);
    setImageUrlInput(product.image);
    setUseFileUpload(false);
    setDescription(product.description);
    setCategory(product.category);
    setEditId(product._id);
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Add Product
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">
              {editId ? "Edit Product" : "Add Product"}
            </h2>
            <div className="flex flex-col gap-4">
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
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={useFileUpload}
                    onChange={() => setUseFileUpload(!useFileUpload)}
                  />
                  Use file upload instead of URL
                </label>

                {useFileUpload ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <input
                    type="text"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="Paste image URL"
                    className="border p-2 rounded w-full"
                  />
                )}
              </div>

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

            <div className="mt-4 flex gap-3 justify-end">
              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                {editId ? "Update" : "Create"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setName("");
                  setPrice("");
                  setImage(null);
                  setImageUrlInput("");
                  setUseFileUpload(true);
                  setDescription("");
                  setCategory("groceries");
                }}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <div className="space-y-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-xl p-4 shadow-sm bg-white flex flex-col md:flex-row md:items-center
               md:justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-20 w-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.description}</p>
                  <p className="text-sm italic text-gray-400">{p.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-600 font-medium mb-2">
                  ${p.price.toFixed(2)}
                </p>
                <div className="flex gap-2 justify-end">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminProductPage;
