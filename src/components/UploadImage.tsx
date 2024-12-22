"use client";
import { useState } from 'react';
import Image from 'next/image';

interface UploadImageProps {
  handleGetArrayImage: (urls: { url: string; public_id: string }[]) => void; // Define the callback type
}

const UploadImage: React.FC<UploadImageProps> = ({ handleGetArrayImage }) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Store base64 preview URLs
  const [uploadedImages, setUploadedImages] = useState<{ url: string; public_id: string }[]>([]); // Store uploaded image URLs
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // Convert FileList to an array
      setImages((prevImages) => [...prevImages, ...filesArray]); // Append to existing images

      // Generate base64 previews for the images
      const previews = filesArray.map(
        (image) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
          })
      );

      // Wait for all previews to load
      Promise.all(previews)
        .then((previewsUrls) => setImagePreviews((prevPreviews) => [...prevPreviews, ...previewsUrls])) // Append previews to existing ones
        .catch((error) => console.error("Error generating previews:", error));
    }
  };

  const handleRemoveImage = (index: number) => {
    // Remove the image from both images and previews arrays
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setLoading(true);

    try {
      // Convert selected images to base64
      const base64Files = await Promise.all(
        images.map(
          (image) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = (error) => reject(error);
            })
        )
      );

      console.log(base64Files, base64Files)
      // Send base64 files to the API
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: base64Files }),
      });

      const data = await response.json();
      if (response.ok) {
        const imageUrls = data.urls.map((item: { url: string }) => item.url);

        // Append new uploaded images to the existing ones
        setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
        
        handleGetArrayImage(imageUrls); // Update parent component with uploaded image URLs
        setImagePreviews([]); // Clear the previews after upload
        setImages([]); // Clear selected images

      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload Images</h1>
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,image/*"
          multiple
          className="block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {/* Preview Section */}
      {imagePreviews.length > 0 && (
        <div className="mt-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Preview Images:</h3>
          <ul className="grid grid-cols-3 md:grid-cols-2 gap-4">
            {imagePreviews.map((preview, index) => (
              <li key={index} className="relative flex flex-col items-center">
                <Image
                  src={preview}
                  alt={`Preview ${index}`}
                  width={150} // Set the width
                  height={150} // Set the height
                  className="object-cover rounded-md border border-gray-200 shadow-sm"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-white rounded-full text-gray-600 p-1 shadow-md"
                  aria-label="Remove Image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Uploading..." : "Submit"}
      </button>

      {/* Display Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Images:</h3>
          <ul className="grid grid-cols-3 md:grid-cols-2 gap-4">
            {uploadedImages.map((item, index) => (
              <li key={index} className="flex flex-col items-center">
                <Image
                  src={item}
                  alt={`Uploaded ${index}`}
                  width={150} // Set the width
                  height={150} // Set the height
                  className="object-cover rounded-md border border-gray-200 shadow-sm"
                />
                <a
                  href={item}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm mt-2 underline"
                >
                  View Image
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
