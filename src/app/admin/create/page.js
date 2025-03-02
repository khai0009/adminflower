"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useRouter } from "next/navigation";

export default function CreateFlower() {
  const [flower, setFlower] = useState({
    name: "",
    descripte: "",
    imageUrl: "",
    price: "",
    quantity: ""
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Flower"), {
        ...flower,
        price: parseFloat(flower.price),
        quantity: parseInt(flower.quantity)
      });
      router.push("/admin/index");
    } catch (error) {
      console.error("Error adding flower:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Flower</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={flower.name}
            onChange={(e) => setFlower({...flower, name: e.target.value})}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={flower.descripte}
            onChange={(e) => setFlower({...flower, description: e.target.value})}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            
            value={flower.imageUrl}
            onChange={(e) => setFlower({...flower, imageUrl: e.target.value})}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={flower.price}
            onChange={(e) => setFlower({...flower, price: e.target.value})}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            value={flower.quantily}
            onChange={(e) => setFlower({...flower, quantity: e.target.value})}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Create Flower
        </button>
      </form>
    </div>
  );
}

