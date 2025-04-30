'use client';

import { get, getAdmin } from "@/app/lib/utlis";
import { useParams } from "next/navigation";
import Error from "@/app/Error";
import Loading from "@/app/Loading";
import NoRes from "@/app/NoRes";
import useSWR from "swr";
import { ProductType } from "../../data/type";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ResponseType {
  product: ProductType;
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSWR<ResponseType>(`/product?id=${id}`, get);
  const { data: stateData } = useSWR<any>(`/state/product?id=${id}`, getAdmin);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    if (data?.product?.image) {
      setMainImage(data.product.image);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (!data?.product) return <NoRes />;

  const {
    name,
    price,
    image,
    alternate_images,
    description,
    ...otherDetails
  } = data.product;

  return (
    <div className="mt-32 p-6 flex flex-col gap-10">
      <h1 className="text-4xl font-extrabold text-center text-white">{name}</h1>

      {stateData?.product && (
        <div className="flex items-center justify-around text-white uppercase font-semibold">
          <p>Quantity: {stateData.product.quantity}</p>
          <p>Sold: {stateData.product.sold}</p>
        </div>
      )}

      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="flex flex-col gap-3 w-full md:w-1/2">
          {Object.entries(otherDetails).map(([key, value]) => (
            <div key={key} className="flex gap-2 text-sm text-white">
              <span className="capitalize text-gray-400 font-semibold">{key}</span>
              <span className="text-red-500 font-bold">:</span>
              <span>{String(value)}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="relative w-full h-80 rounded-xl overflow-hidden bg-red-400">
            {mainImage && (
              <Image
                src={mainImage}
                alt="Main product image"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {[image, ...(alternate_images || [])].map((altImage, index) => (
              <div
                key={index}
                onClick={() => setMainImage(altImage)}
                className="relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer border border-white hover:scale-105 transition"
              >
                <Image
                  src={altImage}
                  alt={`Alt image ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {description && (
        <p className="text-gray-300 leading-relaxed text-lg">{description}</p>
      )}
    </div>
  );
}
