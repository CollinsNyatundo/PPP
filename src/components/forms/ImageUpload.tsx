@@ .. @@
 import React, { useCallback } from 'react';
 import { useDropzone } from 'react-dropzone';
 import { Upload, X } from 'lucide-react';
+import { uploadFile } from '../../lib/api/upload';
+import { toast } from 'react-toastify';

 interface ImageUploadProps {
   value: string;
@@ .. @@
   const onDrop = useCallback(async (acceptedFiles: File[]) => {
     const file = acceptedFiles[0];
     if (!file) return;
+    
+    const maxSize = 5 * 1024 * 1024; // 5MB
+    if (file.size > maxSize) {
+      toast.error('File size must be less than 5MB');
+      return;
+    }

     try {
-      const formData = new FormData();
-      formData.append('file', file);
-      
-      const response = await fetch('/api/upload', {
-        method: 'POST',
-        body: formData,
-      });
-
-      if (!response.ok) {
-        throw new Error('Upload failed');
-      }
-
-      const { url } = await response.json();
+      const url = await uploadFile(file);
       onChange(url);
+      toast.success('Image uploaded successfully');
     } catch (error) {
-      console.error('Upload error:', error);
+      const message = error instanceof Error ? error.message : 'Failed to upload image';
+      toast.error(message);
     }
   }, [onChange]);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
     onDrop,
     accept: {
       'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
     },
     maxFiles: 1,
+    maxSize: 5 * 1024 * 1024, // 5MB
   });

   return (
     <div className="space-y-2">
       <label className="block text-sm font-medium text-gray-300">
         {label}
       </label>
       <div
         {...getRootProps()}
-        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
+        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
           ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-purple-500'}
         `}
       >
         <input {...getInputProps()} />
         {value ? (
           <div className="relative">
             <img
               src={value}
               alt="Preview"
-              className="max-h-48 mx-auto rounded"
+              className="max-h-48 mx-auto rounded shadow-lg"
             />
             <button
               type="button"
               onClick={(e) => {
                 e.stopPropagation();
                 onChange('');
               }}
-              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
+              className="absolute top-2 right-2 p-1.5 bg-red-500/90 backdrop-blur-sm rounded-full text-white 
+                hover:bg-red-600 transition-colors shadow-lg"
             >
               <X className="w-4 h-4" />
             </button>
           </div>
         ) : (
-          <div className="text-gray-400">
+          <div className="text-gray-400 space-y-2">
             <Upload className="w-8 h-8 mx-auto mb-2" />
-            <p>Drag & drop an image here, or click to select</p>
+            <p>Drag & drop an image here, or click to select<br />
+              <span className="text-sm text-gray-500">(Max size: 5MB)</span>
+            </p>
           </div>
         )}
       </div>
     </div>
   );