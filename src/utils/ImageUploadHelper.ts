export const handleDonationUpload = async (file: File) => {
    const imageUrl = await uploadImage(file, "sharebite_donations", "sharebite/donations");
    console.log("Donation Image Uploaded:", imageUrl);
    return imageUrl;
  };

//   const PRESET = import.meta.env.VITE_UPLOAD_PRESET
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME

  const uploadImage = async (file: File, preset: string, folder: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset); // Choose correct preset
    formData.append("folder", folder); // Ensure it's uploaded to the right folder
  
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
  
    const data = await response.json();
    console.log("Uploaded Image URL:", data.secure_url);
    return data.secure_url;
  };