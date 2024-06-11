import { UserInfo } from "@/types";
import instance from "./axios";

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponseBody {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
}

interface PostRequestBody {
  image?: File | undefined;
  content: string;
  title: string;
}

//임시 데이터
const LOGIN_DATA: LoginRequestBody = {
  email: "supernova@email.com",
  password: "password",
};

async function getAccessToken(): Promise<string | null> {
  try {
    const loginRes = await instance.post<LoginResponseBody>(
      "/auth/signIn",
      LOGIN_DATA
    );
    return loginRes.data.accessToken;
  } catch (e) {
    console.error("토큰발급실패", e);
    return null;
  }
}

async function uploadImage(
  image: File,
  accessToken: string
): Promise<string | undefined> {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const response = await instance.post<{ url: string }>(
      "/images/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.url;
  } catch (e) {
    console.error("이미지업로드실패", e);
    return "";
  }
}

export default async function postArticle(
  requestData: PostRequestBody,
  image: File | undefined
): Promise<void> {
  try {
    const formData = new FormData();
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error("토큰 발급 실패");
    }

    if (image) {
      const imageRes = await uploadImage(image, accessToken);
      if (!imageRes) {
        throw new Error("이미지 업로드 실패");
      }
      formData.append("image", imageRes);
    }

    formData.append("title", requestData.title);
    formData.append("content", requestData.content);

    const postRes = await instance.post(`/articles`, requestData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("등록완료", postRes.data);
  } catch (e) {
    console.error("등록실패", e);
  }
}
