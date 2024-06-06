import { ChangeEvent, useState } from "react";

interface ImageInputProps {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

export default function ImageInput({ name, value, onChange }: ImageInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files ? e.target.files[0] : null;
    onChange(name, nextValue);
  };

  return (
    <>
      <label className="text-lg font-bold" htmlFor={name}>
        이미지
      </label>
      <input
        className="w-72 h-72 mb-3 bg-gray-100 rounded-box"
        placeholder="이미지등록"
        type="file"
        id={name}
        name={name}
        onChange={handleChange}
      />
    </>
  );
}
