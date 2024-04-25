import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Alert, AlertTitle } from '@mui/material';
import { ImUpload } from "react-icons/im";
import { ImFolderUpload } from "react-icons/im";
const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setUploadProgress(0);
    setUploadSuccess(false);
    setUploadError(false);
  };
const generateUniqueId = () => {
  // Generate a random six-digit ID
  return Math.floor(100000 + Math.random() * 900000);
};

    const handleUpload = async () => {
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const headers = jsonData[0];

          const totalRows = jsonData.length - 1;
          let uploadedRows = 0;

          jsonData.slice(1).forEach((dataRow) => {
            const mappedObject = {
              orderNumber: generateUniqueId().toString(),
              itemName: dataRow[headers.indexOf('itemName')],
           HUID: dataRow[headers.indexOf('HUID')] || "",
              hireDate: new Date().toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }),
              itemType: dataRow[headers.indexOf('itemType')] || "",
              itemPrice: '180',
               itemWeight: dataRow[headers.indexOf('itemWeight')].toString(),
            joins: dataRow[headers.indexOf('itemName')] + ' ' + '⤅' + dataRow[headers.indexOf('itemWeight')],
              //finess: 91.60,
              itemModel: dataRow[headers.indexOf('itemModel')] || "",
             
              imageSrc: '',
              imageFile: '',
            };

            axios.post('https://serdb.onrender.com/api/FancyStockitem', mappedObject, {
              onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
                setUploadProgress(progress);
              },
            })
              .then((response) => {
                console.log(response.data);
                uploadedRows++;

                if (uploadedRows === totalRows) {
                  setUploadProgress(0);
                  setUploadSuccess(true);

                  setTimeout(() => {
                    setUploadSuccess(false);
                    handleReset();
                  }, 2000);
                }
              })
              .catch((error) => {
                console.error('Error uploading data:', error);
                setUploadError(true);

                setTimeout(() => {
                  setUploadError(false);
                }, 3000);
              });
          });
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const handleReset = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadSuccess(false);
    setUploadError(false);
  };
const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        
        <p><ImFolderUpload /></p>
      </div>
      {file && (
        <div>
          <p>Selected File: {file.name}</p>
          <div>
            <ImUpload onClick={handleUpload}/>
          
          </div>
          {uploadProgress > 0 && (
            <div>
              <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
              <progress value={uploadProgress} max={100} />
            </div>
          )}
          {uploadSuccess && (
            <Alert severity="success" onClose={() => setUploadSuccess(false)}>
              <AlertTitle>Success</AlertTitle>
              Data uploaded successfully!
            </Alert>
          )}
          {uploadError && (
            <Alert severity="error" onClose={() => setUploadError(false)}>
              <AlertTitle>Error</AlertTitle>
              Error uploading data. Please try again.
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
