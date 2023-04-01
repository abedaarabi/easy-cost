// import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
// import React from "react";
// import Card from "@mui/material/Card";
// import { Box } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserToken } from "./helper";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
// https://stackoverflow.com/questions/70278410/auto-desk-forge-viewer-pdf-snap-and-zoom-issue
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import React from "react";
import Card from "@mui/material/Card";
import { Box, Button, Typography } from "@mui/material";
import { async } from "@firebase/util";
import { operationsByTag } from "../api/easyCostComponents";
import { useAuth } from "../authContext/components/AuthContext";
import { Params, useParams } from "react-router-dom";
import { UpdateDocumentMeasureDto } from "../api/easyCostSchemas";
import { AxiosError } from "axios";

export const Viewer = ({
  path,
  forwardViewer,
  setPageNumber,
  pageNumber,
}: {
  path: { urlPath: string; id: string };
  forwardViewer: any;
  setPageNumber: (param: number) => void;
  pageNumber: number;
}) => {
  const { projectId } = useParams<Params<string>>();

  const [isCompleteMeasure, setIsCompleteMeasure] = React.useState(0);

  if (!projectId) {
    return null;
  }
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, mutate, isSuccess } = useMutation(
    (values: UpdateDocumentMeasureDto) =>
      operationsByTag.documentMeasures.documentMeasuresControllerFindAllByMeasurementId(
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
          body: values,
        }
      ),
    {
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error: AxiosError) => {
        console.log(error.message);
        console.log(error.status);
      },
    }
  );

  const [isGeometryLoaded, setIsGeometryLoaded] = React.useState(false);

  let viewer = React.useRef<Autodesk.Viewing.GuiViewer3D | undefined>();

  React.useEffect(() => {
    function initializeViewer() {
      Autodesk.Viewing.Initializer(
        {
          env: "Local",
          useADP: false,
        },

        function () {
          viewer.current = new Autodesk.Viewing.GuiViewer3D(
            document.getElementById("viewer") as HTMLElement
          );
          if (!path.id || !viewer?.current) {
            return;
          }

          viewer.current.addEventListener(
            Autodesk.Viewing.GEOMETRY_LOADED_EVENT,

            (x: Autodesk.Viewing.GuiViewer3D) => {
              //@ts-ignore
              if (x.type === "geometryLoaded") {
                //@ts-ignore
                forwardViewer.current = x.target;

                const pageNum =
                  //@ts-ignore
                  x.model.myData.loadOptions.bubbleNode.data.page;

                if (pageNum ? pageNum : 1) {
                  mutate({
                    projectId: projectId,
                    pageNumber: pageNum,
                    uploadFileId: path.id,
                  });
                }

                setPageNumber(pageNum);
                setIsGeometryLoaded(true);
              }
            }
          );

          viewer?.current?.setTheme("light-theme");
          viewer.current.loadExtension("Autodesk.PDF").then((x) => {
            viewer?.current?.loadExtension("Autodesk.Viewing.MarkupsCore");
            viewer?.current?.loadExtension("Autodesk.Viewing.MarkupsGui");
            viewer?.current?.loadExtension("Autodesk.Vault.Markups");

            viewer?.current?.loadExtension("Autodesk.DocumentBrowser");
            // viewer?.current?.loadExtension("Autodesk.AEC.LevelsExtension");
            // viewer?.current?.loadExtension("Autodesk.AEC.Minimap2DExtension");

            viewer?.current?.loadModel(path.urlPath, {});
          });

          viewer?.current?.start(path.urlPath);
        }
      );
    }

    initializeViewer();
  }, [path?.urlPath]);

  React.useEffect(() => {
    viewer?.current?.addEventListener(
      Autodesk.Viewing.TOOL_CHANGE_EVENT,

      (x) => {
        if (!viewer?.current?.getExtension("Autodesk.Measure")) return;

        const mss = viewer?.current
          ?.getExtension("Autodesk.Measure")
          //@ts-ignore
          ?.measureTool?.getMeasurementList();
        console.log({ mss });

        if (
          (mss.length === 0 || data?.length! > mss.length) &&
          x.active &&
          isGeometryLoaded &&
          viewer?.current?.getExtension("Autodesk.Measure")
        ) {
          //@ts-ignore
          viewer?.current
            .getExtension("Autodesk.Measure")
            //@ts-ignore
            .measureTool.setMeasurements(loadMeasuresFromDb(data));
          //@ts-ignore
        } else {
          mutate({
            projectId: projectId,
            pageNumber: pageNumber,
            uploadFileId: path.id,
          });
        }
      },
      { once: true }
    );
  }, [isGeometryLoaded, isSuccess]);

  React.useEffect(() => {
    if (!viewer?.current) return;

    viewer.current.addEventListener(
      Autodesk.Viewing.EXTENSION_LOADED_EVENT,
      (x) => {
        if (isGeometryLoaded) {
          var ext = viewer?.current?.getExtension("Autodesk.Measure");
          if (!ext) return;
          //@ts-ignore
          ext.sharedMeasureConfig.units = "mm";
          //@ts-ignore
          ext.calibrateByScale("mm", 2.78);
        }
      }
    );
  }, [isGeometryLoaded]);

  return (
    <Box>
      {path.urlPath ? (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "79vh",
            overflow: "hidden",
            borderRadius: "5px",
            border: "4px solid #81b29a",
          }}
          id="viewer"
        ></Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "79vh",
            borderRadius: "5px",
            border: "4px solid #81b29a",
          }}
        >
          <Typography
            sx={{
              margin: 0,
              position: "absolute",
              top: "5%",
              ml: 3,
              // left: "40%",
              transform: "translateY(-50%)",
            }}
            variant="overline"
          >
            Select File to View | supported formant:[".pdf", ".jpg", ".jpeg",
            ".png", ".dwf"]
          </Typography>
          <DescriptionIcon
            fontSize="large"
            color="success"
            sx={{
              margin: 0,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <Box />
        </Box>
      )}
    </Box>
  );
};

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

// viewer.current.addEventListener(
//   //@ts-ignore
//   Autodesk.Viewing.MeasureCommon.selectedTool,
//   (event) => {
//     if (!viewer?.current) return;
//     const measures = viewer?.current
//       .getExtension("Autodesk.Measure")
//       //@ts-ignore
//       .measureTool.getMeasurementList();
//     console.log({ measures: "test" });
//     console.log(Autodesk.Viewing.MeasureCommon);

//     /* HERE YOUR CODE */
//   }
// );

// console.log(viewer?.current?.getExtension("Autodesk.Measure"));

// viewer.current.addEventListener(
//   //@ts-ignore
//   Autodesk.Viewing.MeasureCommon.Events.MEASUREMENT_COMPLETED_EVENT,
//   (event) => {
//     if (!viewer?.current) return;
//     const measures = viewer?.current
//       .getExtension("Autodesk.Measure")
//       //@ts-ignore
//       .measureTool.getMeasurementList();
//     console.log({ measures });
//     console.log(Autodesk.Viewing.MeasureCommon);

//     /* HERE YOUR CODE */
//   }
// );

// const toggleM =
//   //@ts-ignore
//   viewer?.current?.getExtension("Autodesk.Measure").selectedTool;
// console.log({ toggleM }, "@@@@@");

// let group = viewer?.current?.toolbar.getControl("printToolbar");
// if (!group) {
//   group = new Autodesk.Viewing.UI.ControlGroup("printToolbar");
//   viewer?.current?.toolbar.addControl(group);
// }

// const button = new Autodesk.Viewing.UI.Button("printButton");
// button.setIcon("adsk-icon-layers");

// button.onClick = () => {
//   console.log("Print");
// };

// button.setToolTip("Print Sheet");
// //@ts-ignore
// group.addControl(button);

function loadMeasuresFromDb(data: UpdateDocumentMeasureDto[]) {
  if (data?.length === 0) {
    return;
  }
  return data?.map((measure) => JSON.parse(measure.measureValues!));
}
