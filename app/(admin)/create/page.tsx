"use client";

import { useState } from "react";
import useSWR from "swr";
import { get } from "@/app/lib/utlis";

const sharedFields = [
  { name: "company_name", label: "Company Name", type: "text", required: true },
  { name: "name", label: "Product Name", type: "text", required: true },
  { name: "image", label: "Image URL", type: "text", required: false },
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
    { name: "gpu", label: "GPU", type: "text", required: false },
    { name: "motherboard", label: "Motherboard", type: "text", required: false },
    { name: "cooling_system", label: "Cooling System", type: "text", required: false },
    { name: "power_supply", label: "Power Supply", type: "text", required: false },
    { name: "form_factor", label: "Form Factor", type: "text", required: false },
    { name: "weight", label: "Weight", type: "number", required: false },
    { name: "color", label: "Color", type: "text", required: false },
    { name: "usb_ports", label: "USB Ports", type: "number", required: false },
    { name: "hdmi_ports", label: "HDMI Ports", type: "number", required: false },
    { name: "ethernet_ports", label: "Ethernet Ports", type: "number", required: false },
    { name: "warranty", label: "Warranty", type: "text", required: false },
    { name: "release_date", label: "Release Date", type: "date", required: false },
    { name: "wireless_support", label: "Wireless Support", type: "text", required: false },
    { name: "os_preinstalled", label: "OS Preinstalled", type: "text", required: false },
  ],
  networking: [
    { name: "ports", label: "Ports", type: "number", required: false },
    { name: "speed", label: "Speed", type: "text", required: false },
    { name: "protocol", label: "Protocol", type: "text", required: false },
    { name: "wireless", label: "Wireless", type: "text", required: false },
  ],
  peripheral: [
    { name: "color", label: "Color", type: "text", required: false },
    { name: "connectivity", label: "Connectivity", type: "text", required: false },
    { name: "wireless", label: "Wireless", type: "text", required: false },
    { name: "dimensions", label: "Dimensions", type: "text", required: false },
  ],
};

export default function AddProductPage() {
  const [category, setCategory] = useState<"pc" | "networking" | "peripheral" | "">("");
  const [formData, setFormData] = useState<Record<string, any>>({});

  const { data: enums = [], isLoading } = useSWR(category ? `/subenum?name=${category}` : null, get);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const fieldsToRender = [...sharedFields, ...(category ? categoryFields[category] || [] : [])];

  return (
    <div className="min-h-screen mt-32 bg-gray-950 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-850 rounded-2xl shadow-2xl p-8 w-full max-w-4xl space-y-8 border border-gray-700"
      >
        <h1 className="text-4xl font-bold text-center text-red-500 uppercase tracking-widest">Add New Product</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as any);
              handleChange(e);
            }}
            required
            className="p-3 bg-gray-800 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Category</option>
            <option value="pc">PC</option>
            <option value="networking">Networking</option>
            <option value="peripheral">Peripheral</option>
          </select>

          {category && (
            <select
              name="product_type"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="p-3 bg-gray-800 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
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
