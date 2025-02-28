"use client";

import { useState, useEffect } from "react";
import { doc,getDocs, updateDoc,collection,query,where } from "firebase/firestore";
import { db } from "../../../Firebase";
import { useParams, useRouter } from "next/navigation";


export default function EditFlower({ params }) {
  const [flower, setFlower] = useState(null);
  const [docId, setDocId] = useState(null); // Thêm state docId
  const router = useRouter();
  const { id } = useParams(); // Unwrap the params Promise
  const flowerCollection = collection(db, 'Flower');
                const q = query(flowerCollection, where('id', '==', id));

  useEffect(() => {
    const fetchFlower = async () => {
      try {
        

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                  querySnapshot.forEach((doc) => {
                      const flowerData = doc.data();
                      console.log("Document data:", flowerData);
                      setFlower(flowerData);
                      setDocId(doc.id);
                  });
              } else {
                  console.log("No such document!");
              }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchFlower();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
            if (!docId) { 
              console.error("Document ID is missing. Cannot update.");
              return;
            }
            const docRef = doc(db, "Flower", docId); 
            await updateDoc(docRef, {
              ...flower,
              id: id,
              price: parseFloat(flower.price),
              quantily: parseInt(flower.quantily)
            });
            router.push("/");
          } catch (error) {
            console.error("Error updating flower:", error);
          }
  };

  if (!flower) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Flower</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={flower.name}
            onChange={(e) => setFlower({ ...flower, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={flower.description}
            onChange={(e) => setFlower({ ...flower, description: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input

            value={flower.imageUrl}
            onChange={(e) => setFlower({ ...flower, imageUrl: e.target.value })}
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
            onChange={(e) => setFlower({ ...flower, price: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            value={flower.quantity}
            onChange={(e) => setFlower({ ...flower, quantity: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Flower
        </button>
      </form>
    </div>
  );
}
