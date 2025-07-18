export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "urban_munch_preset"); 
  formData.append("folder", "urban-munch"); 

  const res = await fetch(`https://api.cloudinary.com/v1_1/dwwuiydrd/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  const data = await res.json();
  return data.secure_url; 
};
