'use client';

import { useState, ChangeEvent, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface MultipleImageUploaderProps {
  onUploadAction: (images: File[]) => void;
}

export default function MultipleImageUploader({ onUploadAction }: MultipleImageUploaderProps) {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    const imagePreviewsArray = filesArray.map(file => URL.createObjectURL(file));

    setImages(prev => [...prev, ...filesArray]);
    setImagePreviews(prev => [...prev, ...imagePreviewsArray]);

    onUploadAction([...images, ...filesArray]);
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        name="image"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div
        onClick={handleIconClick}
        className="w-full h-32 border-2 border-dashed flex items-center justify-center rounded cursor-pointer hover:bg-gray-100 transition-colors duration-300"
      >
        <AiOutlinePlus className="text-4xl text-gray-400" />
      </div>

      <div className="flex flex-wrap w-full justify-around items-center">
        {imagePreviews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`preview-${index}`}
            className="w-28 h-28 object-cover rounded shadow"
          />
        ))}
      </div>
    </div>
  );
}
