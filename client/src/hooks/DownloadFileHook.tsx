import { useCallback } from "react";

interface DownloadFileHookProps {}

const useDownloadFile = () => {
  const downloadFile = useCallback(
    ({ fileUrl, fileName }: { fileUrl: string; fileName: string }) => {
      if (fileUrl && fileName) {
        fetch(fileUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
          mode: "cors",
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
    },
    []
  );

  return downloadFile;
};

export default useDownloadFile;
