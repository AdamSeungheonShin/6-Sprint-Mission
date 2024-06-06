import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import IconPlus from "@/public/icons/icon_plus.svg";
import IconDelete from "@/public/icons/icon_delete.svg";

interface ImageInputProps {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

export default function ImageInput({ name, value, onChange }: ImageInputProps) {
  const [preview, setPreview] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.files ? e.target.files[0] : null;
    onChange(name, nextValue);
  };

  const handleClearImage = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
  }, [value]);

  return (
    <div>
      {value ? (
        <div className="w-72 h-72 mb-3 bg-gray-100 rounded-box relative">
          <button className="absolute top-2 right-2" onClick={handleClearImage}>
            <Image width={24} height={24} src={IconDelete} alt="이미지삭제" />
          </button>
          <Image
            className="object-cover w-72 h-72 rounded-box"
            width={288}
            height={288}
            src={preview}
            alt="이미지미리보기"
          />
        </div>
      ) : (
        <label
          className="w-72 h-72 mb-3 bg-gray-100 rounded-box flex flex-col justify-center items-center cursor-pointer"
          htmlFor={name}
        >
          <Image src={IconPlus} width={48} height={48} alt="이미지 등록" />
          <p className="text-base text-gray-400 font-normal">이미지 등록</p>
        </label>
      )}
      <input
        className="absolute opacity-0"
        type="file"
        id={name}
        name={name}
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
}
