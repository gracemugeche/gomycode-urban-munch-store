import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();

  // Mock product (replace with fetched data)
  const product = {
    name: "Fresh Tomatoes",
    price: 1.99,
    image: "/groceries/tomatoes.jpg",
    description: "Ripe and juicy tomatoes perfect for salads and cooking.",
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-[Poppins]">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover rounded-xl shadow"
        />
        <div>
          <h1 className="text-3xl font-bold text-purple-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-purple-700 mb-6">Ksh {product.price.toFixed(2)}</p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
