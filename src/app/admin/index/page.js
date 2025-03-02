"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc,query ,where } from "firebase/firestore";
import { db } from "../../Firebase"; // Assuming this exists
import Link from "next/link";
import { CldImage } from 'next-cloudinary';

export default function AdminPage() {
  const [flowers, setFlowers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFlowers = async () => {
      const flowersCollection = collection(db, "Flower");
      const flowersSnapshot = await getDocs(flowersCollection);
      const flowersList = flowersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFlowers(flowersList);
    };
    fetchFlowers();
  }, []);

  const handleDelete = async (fieldIdToDelete) => { // Tham số là trường 'id'
    if (confirm("Are you sure you want to delete this flower?")) {
      const flowerCollection = collection(db, 'Flower');
      const q = query(flowerCollection, where('id', '==', fieldIdToDelete)); // Truy vấn để tìm document bằng trường 'id'
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const firestoreDocIdToDelete = docSnapshot.id; // Lấy Firestore Document ID
          await deleteDoc(doc(db, "Flower", firestoreDocIdToDelete)); // Xóa bằng Firestore Document ID
        });
        setFlowers(flowers.filter(flower => flower.id !== fieldIdToDelete)); // Lọc state cục bộ dựa trên trường 'id'
      } else {
        console.log("Flower not found for deletion."); // Xử lý trường hợp không tìm thấy hoa
      }
    }
  };

  const filteredFlowers = flowers.filter(flower =>
    flower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flower Admin Panel</h1>
      
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search flowers..."
          className="border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link href="/admin/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create New Flower
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Ảnh</th>
              <th className="p-2">Tên</th>
              <th className="p-2">Miêu tả</th>
              <th className="p-2">Giá</th>
              <th className="p-2">Số lượng</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredFlowers.map(flower => (
              <tr key={flower.id} className="border-b text-center">
                <td className="items-center"><CldImage
      src={flower.imageUrl} // Use this sample image or upload your own via the Media Explorer
      width="100" // Transform the image: auto-crop to square aspect_ratio
      height="100"
      crop={{
        type: 'auto',
        
        source: true
      }} alt={flower.name}></CldImage></td>
                <td className="p-2 border-l">{flower.name}</td>
                <td className="p-2 border-l">{flower.description}</td>
                <td className="p-2 border-l">{flower.price}</td>
                <td className="p-2 border-l">{flower.quantity}</td>
                <td className="p-2 border-l">
                  <Link href={`/admin/edit/${flower.id}`} className="text-blue-500 mr-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(flower.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
