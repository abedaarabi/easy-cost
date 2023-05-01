import { useCallback } from "react";

interface DownloadFileHookProps {
  fileUrl: string;
  fileName: string;
}

const useDownloadFile = ({ fileUrl, fileName }: DownloadFileHookProps) => {
  const downloadFile = useCallback(() => {
    if (fileUrl && fileName) {
      fetch(fileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          document.body.removeChild(link);
        });
    }
  }, [fileUrl, fileName]);

  return downloadFile;
};

export default useDownloadFile;
