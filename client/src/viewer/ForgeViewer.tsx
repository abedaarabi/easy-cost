// import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
// import React from "react";
// import Card from "@mui/material/Card";
// import { Box } from "@mui/material";
import "./viewer.css";
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
import {
  UpdateDocumentMeasureDto,
  UpdateMarkupDto,
} from "../api/easyCostSchemas";
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

  //markups

  const {
    data: markupsData,
    mutate: markupsDataIsMutate,
    isSuccess: markupsDataIsSuccess,
    isLoading: markupsIsLoading,
  } = useMutation(
    (values: UpdateMarkupDto) =>
      operationsByTag.markups.markupsControllerFindAll({
        headers: { authorization: `Bearer ${user.accessToken}` },
        body: values,
      }),

    {
      onSuccess: (response: UpdateMarkupDto) => {},
      onError: (error: AxiosError) => {
        console.log(error.message);
        console.log(error.status);
      },
      cacheTime: 0,
    }
  );
  const [isGeometryLoaded, setIsGeometryLoaded] = React.useState(false);
  const [refetchMarkups, setRefetchMarkups] = React.useState(false);
  const [isMarkups, setIsMarkups] = React.useState(false);

  interface CustomViewer extends Autodesk.Viewing.GuiViewer3D {
    markupsCore: any;
  }
  let viewer = React.useRef<Autodesk.Viewing.GuiViewer3D | undefined>();

  let markupsExtension = React.useRef<any | undefined>();
  //@ts-ignore

  console.log(Autodesk.Extensions.Markup);
  //@ts-ignore
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

              //@ts-ignore
              forwardViewer.current = x.target;

              const pageNum =
                //@ts-ignore
                x.model.myData.loadOptions.bubbleNode.data.page;

              setPageNumber(pageNum);
              setIsGeometryLoaded(true);
            }
          }
        );

        // viewer?.current?.loadExtension("Autodesk.AEC.LevelsExtension");
        // viewer?.current?.loadExtension("Autodesk.AEC.Minimap2DExtension");

        viewer?.current?.loadModel(path.urlPath, {}, function onSuccess() {
          viewer?.current?.loadExtension("Autodesk.Viewing.MarkupsCore");
          viewer?.current?.loadExtension("Autodesk.Viewing.MarkupsGui");
          viewer?.current?.loadExtension("Autodesk.Vault.Print");
          viewer?.current?.setTheme("light-theme");
          viewer?.current?.loadExtension("Autodesk.PDF");
          // viewer?.current?.loadExtension("Autodesk.Vault.Markups");
          viewer?.current?.loadExtension("Autodesk.DocumentBrowser");
        });

        viewer?.current?.start(path.urlPath);
      }
    );
  }
  React.useEffect(() => {
    initializeViewer();
    setIsMarkups(false);
  }, [path?.id]);

  React.useEffect(() => {
    if (pageNumber ? pageNumber : 1) {
      mutate({
        projectId: projectId,
        pageNumber: pageNumber,
        uploadFileId: path.id,
      });

      markupsDataIsMutate({
        projectId: projectId,
        pageNumber: pageNumber,
        uploadFileId: path.id,
      });
    }

    setIsMarkups(false);
    pageNumber !== 1 && initializeViewer();
  }, [pageNumber, path.id]);

  React.useEffect(() => {
    viewer?.current?.addEventListener(
      Autodesk.Viewing.TOOL_CHANGE_EVENT,

      (x) => {
        if (
          x.active &&
          x.toolName === "snapper" &&
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
  }, [isSuccess]);

  viewer?.current?.loadExtension("Autodesk.Viewing.MarkupsCore").then((ext) =>
    //@ts-ignore

    ext.addEventListener(
      //@ts-ignore
      Autodesk.Viewing.Extensions.Markups.Core.EVENT_EDITMODE_LEAVE,
      console.log
    )
  );

  viewer?.current?.addEventListener(
    //@ts-ignore

    Autodesk.Viewing.MeasureCommon.Events.MEASUREMENT_MODE_ENTER,
    console.log
  );
  //@ts-ignore

  React.useEffect(() => {
    viewer?.current?.addEventListener(
      Autodesk.Viewing.TOOL_CHANGE_EVENT,
      async (x) => {
        const extension = (await viewer?.current?.loadExtension(
          "Autodesk.Viewing.MarkupsCore"
        )) as any;
        markupsDataIsMutate({
          projectId: projectId,
          pageNumber: pageNumber,
          uploadFileId: path.id,
        });
        if (x.active && x.toolName === "markups.core" && markupsData?.id) {
          // console.log(extension.viewer.getState());

          // extension.viewer.restoreState(extension.viewer.getState());
          // extension.show();
          // getAllMarkups(viewer.current);
          // await extension.clear();
          await extension?.leaveEditMode();
          //@ts-ignore
          await extension.loadMarkups(
            `${markupsData?.markupsString}`,
            "layer_1"
          );
          await extension.enterEditMode("layer_1");
          // await extension.show();
        } else if (!x.active && x.toolName === "markups.core") {
          setIsMarkups(true);
          setPageNumber(0);
          // reloadMarkups();
        }
      }
      // { once: true }
    );
  }, [markupsDataIsSuccess]);

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
            height: "100%",
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
            height: "100%",

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

async function getAllMarkups(viewer?: any | undefined) {
  const extension = await viewer.loadExtension("Autodesk.Viewing.MarkupsCore");
  const extension0 = await viewer.loadExtension("Autodesk.Viewing.MarkupsGui");
  return;
  //@ts-ignore
  // var markupsStringData = extension.generateData();
  // localStorage.setItem("markups", markupsStringData);
  // Erase all markups onscreen, then load markups back onto the view
  //@ts-ignore

  // extension.clear();

  //@ts-ignore

  // extension?.enterViewMode(); // Very important!!
  //@ts-ignore
  // extension.loadMarkups(localStorage.getItem("markups"));
  // console.log(localStorage.getItem("markups"));

  //@ts-ignore

  // extension.enterViewMode(); // Very important!!
  //@ts-ignore

  // await markupsCore.enterEditMode();

  // await markupsCore.loadMarkups(x, "layer1");
  console.log("abdo");

  await extension.leaveEditMode();
  await extension.loadMarkups(localStorage.getItem("markups"), "layer_1");
  await extension.enterEditMode("layer_1");

  // extension?.enterEditMode();
  //@ts-ignore
  // extension.loadMarkups(myMarkupString2);
}

async function saveMarkupsToDatabase(viewer: any) {
  const markupsExtension = await viewer.loadExtension(
    "Autodesk.Viewing.MarkupsCore"
  );

  const markupsData = await markupsExtension.generateData();
  console.log({ markupsData });

  //Save to database

  // await localStorage.setItem("markups", markupsStringData);
  // console.log(localStorage.getItem("markups"));

  // var markupsStringData = await extension.generateData();
}
