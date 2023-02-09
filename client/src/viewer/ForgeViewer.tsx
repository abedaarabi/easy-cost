// import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
// import React from "react";
// import Card from "@mui/material/Card";
// import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserToken } from "./helper";

// export const Viewer = () => {
//   const viewerRef = React.useRef<Autodesk.Viewing.GuiViewer3D | undefined>();
//   const urn =
//     "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLndvVVlpMTlBVGhtaDJfTW4wQzJZR1E_dmVyc2lvbj0x";

//   const { isLoading, data, isError } = useQuery(["userToken"], getUserToken);

//   if (isLoading) {
//     return <h1>loading</h1>;
//   }
//   console.log({ isLoading, data, isError });

//   React.useEffect(() => {
//     function launchViewer(urn: string, access_token: string) {
//       if (!urn) return;
//       var options = {
//         env: "AutodeskProduction2",
//         getAccessToken: () => access_token,
//         api: "streamingV2",
//       };

//       Autodesk.Viewing.Initializer(options, () => {
//         viewerRef.current = new Autodesk.Viewing.GuiViewer3D(
//           document.getElementById("viewer") as HTMLElement,
//           {
//             extensions: [
//               "Autodesk.DocumentBrowser",
//               "Autodesk.AEC.LevelsExtension",
//               "Autodesk.AEC.Minimap3DExtension",
//               "Autodesk.VisualClusters",
//               "Autodesk.Viewing.ZoomWindow",
//               "Autodesk.Measure",
//             ],
//           }
//         );

//         viewerRef.current.start();
//         let num = 0;
//         viewerRef.current.addEventListener(
//           Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
//           (x: any) => {
//             console.log(x);

//             //     setLoadedViewer(x.type + num++);

//             //     // NOP_VIEWER.model.getData().loadOptions.bubbleNode.getRootNode().children[0].name()
//             //     forwardRef.current = x.target;
//             //     // dispatch(viewListDataStatus(x.type));
//           }
//         );
//         console.log("after viewer loaded");

//         viewerRef.current.setLightPreset(8);
//         viewerRef.current.setEnvMapBackground(false);
//         // console.log("test", window.v);
//         var documentId = "urn:" + urn;

//         Autodesk.Viewing.Document.load(
//           documentId,
//           onDocumentLoadSuccess,
//           //@ts-ignore
//           onDocumentLoadFailure
//         );
//       });
//     }

//     function onDocumentLoadSuccess(doc: Autodesk.Viewing.Document) {
//       const viewable = doc
//         .getRoot()
//         .getDefaultGeometry() as Autodesk.Viewing.Document;

//       viewerRef?.current?.loadDocumentNode(doc, viewable).then((i) => {
//         console.log("abed", i);
//         // documented loaded, any action?
//       });
//     }
//     function onDocumentLoadFailure(
//       viewerErrorCode: Autodesk.Viewing.ErrorCodes,
//       viewerErrorMsg: Autodesk.Viewing.ErrorCodes
//     ): void {
//       console.error(
//         "onDocumentLoadFailure() - errorCode:" +
//           viewerErrorCode +
//           "\n- errorMessage:" +
//           viewerErrorMsg
//       );
//     }

//     if (data.access_token) {
//       launchViewer(urn, data.access_token);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         width: "100%",
//         height: "100%",
//         overflow: "hidden",
//         borderRadius: "5px",
//       }}
//       id="viewer"
//     ></Box>
//   );
// };

// https://stackoverflow.com/questions/70278410/auto-desk-forge-viewer-pdf-snap-and-zoom-issue
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import React from "react";
import Card from "@mui/material/Card";
import { Box, Button } from "@mui/material";

export const Viewer = () => {
  const { isLoading, data, isError } = useQuery(["userToken"], getUserToken);
  const [masures, setMasures] = React.useState([]) as any;

  console.log({ isLoading, data, isError });

  const viewer = React.useRef<Autodesk.Viewing.GuiViewer3D | undefined>();
  React.useEffect(() => {
    function initializeViewer() {
      Autodesk.Viewing.Initializer(
        {
          env: "Local",

          // env: "AutodeskProduction2",
          // api: "streamingV2",
          // getAccessToken: () => data?.access_token,
        },

        function () {
          viewer.current = new Autodesk.Viewing.GuiViewer3D(
            document.getElementById("viewer") as HTMLElement,
            {
              extensions: [
                "Autodesk.DocumentBrowser",
                "Autodesk.AEC.LevelsExtension",
                "Autodesk.AEC.Minimap3DExtension",
                "Autodesk.VisualClusters",
                "Autodesk.Viewing.ZoomWindow",
                "Autodesk.PDF",
                "Autodesk.DWF",
                "Autodesk.Measure",
                "Autodesk.Viewing.MarkupsGui",
              ],
            }
          );

          viewer.current.addEventListener(
            //@ts-ignore
            Autodesk.Viewing.MeasureCommon.Events.DELETE_MEASUREMENT,
            (event) => {
              console.log(event, "###");

              /* HERE YOUR CODE */
            }
          );
          viewer.current.addEventListener(
            //@ts-ignore
            Autodesk.Viewing.MeasureCommon.Events.MEASUREMENT_COMPLETED_EVENT,
            (event) => {
              console.log(event, "###");

              /* HERE YOUR CODE */
            }
          );
          // viewer.current.addEventListener(
          //   //@ts-ignore
          //   Autodesk.Viewing.Extensions.Markups.Core.MarkupsCore,
          //   (event) => {
          //     console.log(event, "###");

          //     /* HERE YOUR CODE */
          //   }
          // );

          // viewer.current.loadExtension("Autodesk.Measure").then(() => {
          //   viewer?.current?.addEventListener(
          //     //@ts-ignore
          //     Autodesk.Viewing.MeasureCommon.Events.CALIBRATION_REQUIRED_EVENT,
          //     (event) => {
          //       console.log(event, "###");

          //       /* HERE YOUR CODE */
          //     }
          //   );
          // });

          // viewer.current.loadExtension("Autodesk.PDF").then(() => {
          //   viewer?.current?.setTheme("light-theme");

          //   viewer?.current?.loadExtension("Autodesk.Viewing.MarkupsCore");
          //   viewer?.current?.loadExtension("Autodesk.Viewing.MarkupsGui");
          //   //@ts-ignore
          // });

          viewer.current.loadModel(
            "../../test.pdf",
            {},
            // @ts-ignore
            onDocumentLoadSuccess,
            onDocumentLoadFailure
          );

          viewer?.current?.start();

          // viewer.loadExtension("Autodesk.PDF").then(() => {
          //   //@ts-ignore
          //   viewer.loadModel("../../pdf.pdf");
          //   viewer.start();
          // });

          //@ts-ignore

          // viewer.loadExtension("Autodesk.PDF").then(() => {
          // viewer.loadExtension("Autodesk.Measure");
          // viewer.loadExtension("Autodesk.PDF");
          // viewer.loadExtension("Autodesk.Viewing.MarkupsCore");
          // viewer.loadExtension("Autodesk.Viewing.MarkupsGui");
          // viewer.loadExtension("Autodesk.DocumentBrowser");
          // viewer.loadExtension("Autodesk.AEC.LevelsExtension");
          // viewer.loadExtension("Autodesk.AEC.Minimap2DExtension");
          // viewer.loadExtension("Autodesk.VisualClusters");
          // viewer.loadExtension("Autodesk.Viewing.MemoryLimitedDebug");
          // viewer.loadModel(
          //   "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLndvVVlpMTlBVGhtaDJfTW4wQzJZR1E_dmVyc2lvbj0x",
          //   onDocumentLoadSuccess
          // );
          // viewer.current.loadModel("../../pdf.pdf", onDocumentLoadSuccess);

          // viewer.current.start();
        }
      );
      // });
    }
    function onDocumentLoadSuccess(doc: Autodesk.Viewing.Document) {
      if (!viewer.current) return;
      const viewable = doc
        .getRoot()
        .getDefaultGeometry() as Autodesk.Viewing.Document;
      viewer.current.loadDocumentNode(doc, viewable);
    }
    function onDocumentLoadFailure(
      viewerErrorCode: Autodesk.Viewing.ErrorCodes,
      viewerErrorMsg: Autodesk.Viewing.ErrorCodes
    ): void {
      console.error(
        "onDocumentLoadFailure() - errorCode:" +
          viewerErrorCode +
          "\n- errorMessage:" +
          viewerErrorMsg
      );
    }
    initializeViewer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function getMasures() {
    if (!viewer.current) {
      return;
    }

    const m = viewer.current
      .getExtension("Autodesk.Measure")
      //@ts-ignore
      .measureTool.getMeasurementList();
    setMasures(m);
    console.log("masures", masures, viewer.current);
  }
  function settMasures() {
    if (!viewer.current) {
      return;
    }
    console.log(masures, Autodesk.Viewing.MeasureCommon);

    viewer.current
      .getExtension("Autodesk.Measure")
      //@ts-ignore
      .measureTool.setMeasurements(masures);
  }
  return (
    <Box>
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
      <Box
        sx={{
          position: "absolute",
          zIndex: "9999",
          overflow: "hidden",
          borderRadius: "5px",
          display: "flex",
          gap: 1,
        }}
      >
        <Button variant="outlined" onClick={getMasures}>
          {" "}
          Get Measure
        </Button>
        <Button variant="outlined" onClick={settMasures}>
          {" "}
          Set Measure
        </Button>
        <Button variant="outlined" onClick={() => setMasures([])}>
          {" "}
          remove Measure
        </Button>
      </Box>
    </Box>
  );
};
