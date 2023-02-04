//https://stackoverflow.com/questions/70278410/auto-desk-forge-viewer-pdf-snap-and-zoom-issue
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import React from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";

export const Viewer = () => {
  React.useEffect(() => {
    function initializeViewer() {
      Autodesk.Viewing.Initializer(
        { env: "Local", useADP: false },
        async function () {
          const viewer = new Autodesk.Viewing.GuiViewer3D(
            document.getElementById("viewer") as any
          );
          viewer.setTheme("light-theme");
          viewer.start();
          viewer.loadExtension("Autodesk.PDF").then(() => {
            //@ts-ignore
            viewer.loadModel("../../test.pdf");
            viewer.loadExtension("Autodesk.Viewing.MarkupsCore");
            viewer.loadExtension("Autodesk.Viewing.MarkupsGui");
            viewer.loadExtension("Autodesk.DocumentBrowser");
          });
        }
      );
    }

    initializeViewer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "5px",
      }}
      id="viewer"
    ></Box>
  );
};
