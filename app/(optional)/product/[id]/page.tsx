'use client';

import { get,getAdmin } from "@/app/lib/utlis";
import { useParams } from "next/navigation";
import Error from "@/app/Error";
import Loading from "@/app/Loading";
import NoRes from "@/app/NoRes";
import useSWR from "swr";
import { ProductType } from "../../data/type";

interface ResponseType {
  product: ProductType;
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSWR<ResponseType>(`/product?id=${id}`, get);
  const { data:stateData, isLoading:stateIsLoading, error:stateError } = useSWR<any>(`/state/product?id=${id}`, getAdmin);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
    if (!data?.product) return <NoRes />;
    if (stateData)
        console.log(stateData)
  const { name, price, id: productId, description, ...otherDetails } = data.product;

  return (
    <div className="mt-32 p-6 flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold text-center text-white">{name}</h1>
          {stateData?.product&&
              <div className="flex items-center justify-around w-full ">
              <p className="text-white font-semibold uppercase ">quantity :{ stateData.product.quantity}</p>
              <p className="text-white font-semibold uppercase ">sold : {stateData.product.sold }</p>
              </div>
          }
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="flex flex-col gap-y-2 w-full md:w-1/2">
          {Object.entries(otherDetails).map(([key, value]) => (
            <div key={key} className="flex items-center gap-x-3">
              <span className="text-sm font-semibold text-gray-400 capitalize">
                {key}
              </span>
              <span className="text-red-500 font-bold">:</span>
              <span className="text-sm font-medium text-white">{String(value)}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div className="h-64 bg-red-400 rounded-lg flex items-center justify-center text-white font-bold">
            Image or Media
          </div>
          <div className="h-32 bg-blue-400 rounded-lg flex items-center justify-center text-white font-bold">
            Related Info
          </div>
        </div>
      </div>

      {description && (
        <p className="text-lg text-gray-300 mt-6 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
