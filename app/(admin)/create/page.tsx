'use client'
import { useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { get, post } from "@/app/lib/utlis";
import { useAuth } from "@/app/hooks/auth";
import NotFound from "@/app/NotFound";
import { useRouter } from "next/navigation";
import MultipleImageUploader from "../components/ImagesLoader";

const sharedFields = [
  { name: "company_name", label: "Company Name", type: "text", required: true },
  { name: "name", label: "Product Name", type: "text", required: true },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "quantity", label: "Quantity", type: "number", required: true },
  { name: "sold", label: "Sold", type: "number", required: true },
  { name: "description", label: "Description", type: "textarea", required: false },
];

const categoryFields: Record<string, { name: string; label: string; type: string; required: boolean }[]> = {
  pc: [
    { name: "cpu", label: "CPU", type: "text", required: true },
    { name: "ram", label: "RAM", type: "text", required: true },
    { name: "storage", label: "Storage", type: "text", required: true },
  ],
  networking: [
    { name: "ports", label: "Ports", type: "number", required: false },
    { name: "speed", label: "Speed", type: "text", required: false },
  ],
  peripheral: [
    { name: "color", label: "Color", type: "text", required: false },
    { name: "connectivity", label: "Connectivity", type: "text", required: false },
  ],
};

export default function AddProductPage() {
  const [category, setCategory] = useState<"pc" | "networking" | "peripheral" | "">("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File>();
  const router = useRouter();
  const { data: enums = [], isLoading } = useSWRImmutable(category ? `/subenum?name=${category}` : null, get);

  const { isAuth, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (uploadedImages: File[]) => {
    setMainImage(uploadedImages[0]);
  };
  const handleImagesUpload = (uploadedImages: File[]) => {
    setImages(uploadedImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  
    formDataToSend.append("data",JSON.stringify(formData))
  
    
    if (mainImage) {
      formDataToSend.append("image", mainImage);
    }
    if (images?.length > 0) { 
      images.map((image, index) => {
        formDataToSend.append("images",image)
       })
     
    }
    try {
      const response = await post(`/${category}s`, formDataToSend);
  
      router.push(`/product/${response.id}`);
    } catch (err) {
      console.error("Upload failed:")
    }
  };
  
  const fieldsToRender = [...sharedFields, ...(category ? categoryFields[category] || [] : [])];

  if (!loading && !isAuth) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen mt-32 bg-gray-950 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-850 rounded-2xl shadow-2xl p-8 w-full max-w-4xl space-y-8 border border-gray-700"
      >
        <h1 className="text-4xl font-bold text-center text-red-500 uppercase tracking-widest">Add New Product</h1>

        <MultipleImageUploader label="Select the main Image:" onUploadAction={handleImageUpload} />
        <MultipleImageUploader label="Select at max 4 Images:" onUploadAction={handleImagesUpload} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            name="type"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as any);
              handleChange(e);
            }}
            required
            className="p-3 col-span-full bg-gray-800 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Category</option>
            <option value="pc">PC</option>
            <option value="networking">Networking</option>
            <option value="peripheral">Peripheral</option>
          </select>

          {enums.length !==0 && (
            <select
              name="product_type"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="p-3 col-span-full bg-gray-800 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Product Type</option>
              {enums.map((enumValue: string) => (
                <option key={enumValue} value={enumValue}>
                  {enumValue}
                </option>
              ))}
            </select>
          )}

          {fieldsToRender.map((field) =>
            field.type === "textarea" ? (
              <textarea
                key={field.name}
                name={field.name}
                placeholder={field.label}
                onChange={handleChange}
                required={field.required}
                rows={3}
                className="p-3 bg-gray-800 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 col-span-full"
              />
            ) : (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.label}
                onChange={handleChange}
                required={field.required}
                className="p-3 bg-gray-900 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            )
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition duration-300"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}
