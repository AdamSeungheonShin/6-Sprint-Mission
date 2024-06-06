import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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
      <input
        className="w-72 h-72 mb-3 bg-gray-100 rounded-box"
        placeholder="이미지등록"
        type="file"
        id={name}
        name={name}
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <div>
          <Image width={288} height={288} src={preview} alt="이미지미리보기" />
          <button onClick={handleClearImage}>삭제</button>
        </div>
      )}
    </div>
  );
}
