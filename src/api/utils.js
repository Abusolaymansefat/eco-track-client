import axios from "axios";

// Upload image and return image URL
export const imageUpload = async (imageFile) => {
  const imageFormData = new FormData();
  imageFormData.append("image", imageFile);

  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    imageFormData
  );

  return res?.data?.data?.display_url;
};
