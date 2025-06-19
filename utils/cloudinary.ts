// utils/cloudinary.ts
export async function uploadToCloudinary(
  file: Buffer | File, 
  type: 'image' | 'pdf' = 'image',
  fileName?: string
) {
  const formData = new FormData();
  
  // Handle both Buffer (Node.js) and File (browser) inputs
  if (file instanceof Buffer) {
    formData.append('file', new Blob([file], { type: type === 'image' ? 'image/png' : 'application/pdf' }), fileName);
  } else {
    formData.append('file', file);
  }
  
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

  if (type === 'pdf') {
    formData.append('resource_type', 'raw');
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${type === 'image' ? 'image' : 'raw'}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Cloudinary error details:', data);
      throw new Error(data.error?.message || 'Failed to upload file');
    }

    console.log('Upload successful:', data);
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload file');
  }
}