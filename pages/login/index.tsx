import Image from "next/image";
import Link from "next/link";
import iconLogo from "@/public/icons/logo_panda.svg";
import textLogo from "@/public/icons/logo_text.svg";
import iconVisible from "@/public/icons/icon_visible.svg";
import iconInvisible from "@/public/icons/icon_invisible.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginRequestBody } from "@/types";
import instance from "@/lib/axios";
import { useRouter } from "next/router";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginRequestBody>({
    mode: "onChange",
  });

  const router = useRouter();

  const isValid: boolean = !errors.email && !errors.password;

  const login: SubmitHandler<LoginRequestBody> = async (formData) => {
    try {
      const res = await instance.post("/auth/signIn", formData);
      const accessToken = res.data?.accessToken;
      localStorage.setItem("accessToken", accessToken);
      if (accessToken) {
        router.push("/");
      }
    } catch (e) {
      console.error("failed to login", e);
    }
  };

  return (
    <div className="w-[640px] mx-auto">
      <Link href={"/"} className="flex gap-4 justify-center mb-12">
        <Image src={iconLogo} width={104} height={104} alt="판다마켓로고" />
        <Image src={textLogo} width={266} height={90} alt="판다마켓로고" />
      </Link>
      <div className="flex flex-col gap-6">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(login)}>
          <label className="text-lg font-bold" htmlFor="email">
            이메일
          </label>
          <input
            className={`w-full h-14 ${errors.email ? "border-red-500 border-solid border-[2px]" : ""}`}
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "잘못된 이메일 형식입니다",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <label className="text-lg font-bold" htmlFor="password">
            비밀번호
          </label>
          <div className="w-full relative">
            <input
              className={`w-full h-14 ${errors.password ? "border-red-500 border-solid border-[2px]" : ""}`}
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력해주세요",
                },
              })}
            />
            <Image
              className="absolute right-6 inset-y-0 my-auto"
              src={iconInvisible}
              width={24}
              height={24}
              alt="비밀번호보기버튼"
            />
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <button
            className={`w-full h-14 rounded-full
            ${
              isSubmitting || !isValid
                ? "cursor-not-allowed bg-gray-default"
                : "cursor-pointer bg-blue-default hover:bg-hover-blue active:bg-active-blue"
            }`}
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            로그인
          </button>
        </form>
        <div className="w-full h-16 px-6 flex justify-between items-center bg-[#E6F2FF] rounded-box">
          <p className="text-base font-medium">간편로그인하기</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white rounded-full">구글</button>
            <button className="w-10 h-10 bg-yellow-300 rounded-full">
              카카
            </button>
          </div>
        </div>
        <p className="text-base font-medium mx-auto">
          판다마켓이 처음이신가요? <Link href="/login">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
