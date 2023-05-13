// import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
// import React from "react";
// import Card from "@mui/material/Card";
// import { Box } from "@mui/material";
import "./LoggerExtension.ts";
import "./SummaryExtension.ts";
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
  CreateDocumentMeasureDto,
  CreateMarkupDto,
  UpdateAwDto,
  UpdateDocumentMeasureDto,
  UpdateFileVersionDto,
  UpdateMarkupDto,
} from "../api/easyCostSchemas";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export const Viewer = ({
  path,
  forwardViewer,
  setPageNumber,
  pageNumber,
}: {
  path: { urlPath: string; id: string; unit: string; size: number };
  forwardViewer: any;
  setPageNumber: (param: number) => void;
  pageNumber: number;
}) => {
  const { projectId } = useParams<Params<string>>();
  const { user, setLoginMsg } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("page");
  console.log(param, "searchParams");

  if (!projectId) {
    return null;
  }

  const queryClient = useQueryClient();

  // Doc Info
  const {
    data: filesInfo,
    isSuccess: isSuccessFilesInfo,
    isFetching,
    refetch: documentInfoRefetch,
  } = useQuery(
    ["documentInfo"],
    () =>
      operationsByTag.fileVersions.fileVersionsControllerFindOne({
        pathParams: { id: path.id },
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    { enabled: false }
  );
  console.log({ filesInfo, isSuccess: isSuccessFilesInfo, path });
  console.log(path.id);

  //Measures
  const { data, mutate, isSuccess } = useMutation(
    (values: UpdateDocumentMeasureDto) =>
      operationsByTag.documentMeasures.documentMeasuresControllerFindAllByMeasurementId(
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
          body: values,
        }
      ),
    {
      onSuccess: (response) => {},
      onError: (error: AxiosError) => {
        console.log(error.message);
        console.log(error.status);
      },
    }
  );

  const createMeasures = useMutation(
    (values: CreateDocumentMeasureDto) =>
      operationsByTag.documentMeasures.documentMeasuresControllerCreate({
        body: values,
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    {
      onSuccess: (response) => {
        console.log({ response });

        setLoginMsg({
          code: 200,
          msg: `Measures Successfully Added to Database.`,
        });
      },

      onError: (error: AxiosError) => {
        console.log({ error });

        setLoginMsg({
          code: error.response?.status,

          msg: `Code Error:  ${
            error.response?.status
          }. ${error.response?.statusText.toLocaleLowerCase()}`,
        });
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

  const createMarkups = useMutation(
    (values: CreateMarkupDto) =>
      operationsByTag.markups.markupsControllerCreate({
        body: values,
        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["documentInfo"]);

        setLoginMsg({
          code: 200,
          msg: `Measures Successfully Added to Database.`,
        });
      },

      onError: (error: AxiosError) => {
        console.log({ error });

        setLoginMsg({
          code: error.response?.status,

          msg: `Code Error:  ${
            error.response?.status
          }. ${error.response?.statusText.toLocaleLowerCase()}`,
        });
      },
    }
  );

  const updateCalibration = useMutation(
    ({ id, values }: { id: string; values: UpdateFileVersionDto }) =>
      operationsByTag.fileVersions.fileVersionsControllerUpdate({
        pathParams: { id },
        body: { ...values },

        headers: { authorization: `Bearer ${user.accessToken}` },
      }),
    {
      onSuccess: (response) => {
        setIsMarkups(false);

        setLoginMsg({
          code: 200,
          msg: `updateCalibration Successfully`,
        });
      },

      onError: (error: AxiosError) => {
        console.log({ error });

        setLoginMsg({
          code: error.response?.status,

          msg: `Code Error:  ${
            error.response?.status
          }. ${error.response?.statusText.toLocaleLowerCase()}`,
        });
      },
    }
  );

  let viewer = React.useRef<Autodesk.Viewing.GuiViewer3D | undefined>();

  let markupsExtension = React.useRef<any | undefined>();
  //@ts-ignore

  // console.log(Autodesk.Extensions.Markup);
  //TODO: MOVE IT TO ANOTHER FILE.
  function initViewer() {
    return new Promise(function (resolve, reject) {
      Autodesk.Viewing.Initializer(
        {
          env: "Local",
          useADP: false,
        },
        function () {
          const config = {
            extensions: [
              "Autodesk.DocumentBrowser",
              "Autodesk.Viewing.MarkupsCore",
              // "Autodesk.Vault.Markups",
              "Autodesk.Viewing.MarkupsGui",
              "Autodesk.Vault.Print",
              "Autodesk.PDF",
              // "LoggerExtension",
              // "SummaryExtension",
            ],
          };
          viewer.current = new Autodesk.Viewing.GuiViewer3D(
            document.getElementById("viewer") as HTMLElement,
            config
          );
          if (viewer.current) {
            viewer.current.start(path.urlPath);
            viewer.current.setTheme("light-theme");

            viewer.current.addEventListener(
              Autodesk.Viewing.GEOMETRY_LOADED_EVENT,

              (x: Autodesk.Viewing.GuiViewer3D) => {
                //@ts-ignore
                if (x.type === "geometryLoaded") {
                  //@ts-ignore
                  documentInfoRefetch();
                  //@ts-ignore
                  forwardViewer.current = x.target;
                  //@ts-ignore

                  //@ts-ignore

                  const pageNum =
                    //@ts-ignore
                    x.model.myData.loadOptions.bubbleNode.data.page;

                  setPageNumber(pageNum);
                  setIsGeometryLoaded(true);
                }
              }
            );
            resolve(viewer.current);
          }
        }
      );
    });
  }

  function loadModel(viewer: Autodesk.Viewing.GuiViewer3D, urn: string) {
    return new Promise(function (resolve, reject) {
      function onDocumentLoadSuccess(doc: any) {
        const uu = doc.getRoot().search({ role: "2d" });

        resolve(
          viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry())
        );
        return doc.getRoot();
      }
      function onDocumentLoadFailure(code: any, message: any, errors: any) {
        reject({ code, message, errors });
      }
      viewer.setLightPreset(0);
      Autodesk.Viewing.Document.load(
        urn,
        onDocumentLoadSuccess,
        onDocumentLoadFailure
      );
    });
  }

  React.useEffect(() => {
    const handleCalibrationFinished = (e: any) => {
      console.log(e, "Measure Leave");
      const MsToDb = getMeasure(e.target);

      if (MsToDb.length === 0) {
        alert("open measure tab");
        return;
      }

      const normalizeMeasureValues = MsToDb?.map((i: any) => {
        return {
          measureValues: JSON.stringify(i),
          measurementId: generateMeasureId(i),
          projectId: projectId,
          filesVersionId: path?.id,
          pageNumber: pageNumber ? pageNumber : 1,
        };
      });
      console.log("Measure leave mutae", normalizeMeasureValues);
      createMeasures.mutate(normalizeMeasureValues);
    };

    viewer?.current?.addEventListener(
      //@ts-ignore
      Autodesk.Viewing.MeasureCommon.Events.MEASUREMENT_MODE_LEAVE,
      handleCalibrationFinished
    );

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      viewer?.current?.removeEventListener(
        //@ts-ignore
        Autodesk.Viewing.MeasureCommon.Events.MEASUREMENT_MODE_LEAVE,
        handleCalibrationFinished
      );
    };
  }, [viewer.current, isMarkups]);

  //TODO: MOVE IT TO ANOTHER FILE.
  async function initializeViewer2(): Promise<
    Autodesk.Viewing.GuiViewer3D | unknown
  > {
    try {
      const viewer = (await initViewer()) as Autodesk.Viewing.GuiViewer3D;
      await loadModel(viewer, path.urlPath);
      documentInfoRefetch();
      return viewer;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to initialize viewer");
    }
  }
  React.useEffect(() => {
    initializeViewer2();
    setIsMarkups(false);
  }, [path?.urlPath]);

  React.useEffect(() => {
    mutate({
      projectId: projectId,
      pageNumber: pageNumber ? pageNumber : 1,
      filesVersionId: path.id,
    });

    markupsDataIsMutate({
      projectId: projectId,
      pageNumber: pageNumber ? pageNumber : 1,
      filesVersionId: path.id,
    });

    if (pageNumber !== 1) {
      initializeViewer2();
    }
    setIsMarkups(false);
  }, [pageNumber, isMarkups, path?.id]);

  React.useEffect(() => {
    const handleCalibrationFinished = async (e: any) => {
      console.log(e);

      if (viewer?.current) {
        const measureExt = await viewer?.current.getExtension(
          "Autodesk.Measure"
        );

        // if (path?.unit !== "") {
        //   //@ts-ignore
        //   measureExt.calibrationTool.calibrateByScale(path?.unit, path?.scale);
        // }
        if (filesInfo?.id) {
          //@ts-ignore
          measureExt.calibrationTool.calibrateByScale(
            filesInfo?.unit,
            filesInfo?.scale
          );
        }

        //@ts-ignore

        //@ts-ignore
        await measureExt.setMeasurements(loadMeasuresFromDb(data));
      }
    };

    viewer?.current?.addEventListener(
      //@ts-ignore
      Autodesk.Viewing.MeasureCommon.Events.MEASUREMENT_MODE_ENTER,
      handleCalibrationFinished,
      { once: true }
    );

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      viewer?.current?.removeEventListener(
        //@ts-ignore
        Autodesk.Viewing.MeasureCommon.Events.MEASUREMENT_MODE_ENTER,
        handleCalibrationFinished
      );
    };
  }, [viewer.current, isSuccess]);

  React.useEffect(() => {
    const handleCalibrationFinished = (e: any) => {
      console.log(e);
      const values: UpdateFileVersionDto = {
        scale: e.scaleFactor,
        unit: e.units,
      };
      updateCalibration.mutate({ id: path.id, values });

      // window.location.reload();
      // setPageNumber(0);
      // setIsMarkups(!isMarkups);
    };

    viewer?.current?.addEventListener(
      //@ts-ignore
      Autodesk.Viewing.MeasureCommon.Events.FINISHED_CALIBRATION,
      handleCalibrationFinished
    );

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      viewer?.current?.removeEventListener(
        //@ts-ignore
        Autodesk.Viewing.MeasureCommon.Events.FINISHED_CALIBRATION,
        handleCalibrationFinished
      );
    };
  }, [viewer.current]);

  // let adam = false;

  // React.useEffect(() => {
  //   if (!viewer.current) {
  //     return;
  //   }
  //   const handleMarkupsFinished = async (ext: any) => {
  //     if (ext.type === "EVENT_EDITMODE_ENTER") {
  //       console.log(markupsData?.markupsString);
  //       if (markupsData?.markupsString) {
  //         await activateMarkups(viewer.current, markupsData?.markupsString);
  //       }
  //       // console.log({ adam });
  //       // if (adam) return;

  //       // console.log(`${markupsData?.markupsString}`);
  //       // ext.target?.leaveEditMode("layer_1");
  //       // // ext.target?.clear();
  //       // ext.target?.loadMarkups(`${markupsData?.markupsString}`, "layer_1");
  //       // ext.target?.showMarkups("layer_1");
  //       // console.log("@@@@@");
  //       // adam = true;

  //       // ext.target?.enterEditMode("layer_1");
  //     }
  //   };
  //   viewer.current
  //     .loadExtension("Autodesk.Viewing.MarkupsCore")
  //     .then((ext: any) => {
  //       ext.addEventListener(
  //         //@ts-ignore
  //         Autodesk.Viewing.Extensions.Markups.Core.EVENT_EDITMODE_ENTER,
  //         handleMarkupsFinished
  //         // { once: true }
  //       );
  //     });

  //   return () => {
  //     viewer?.current
  //       ?.loadExtension("Autodesk.Viewing.MarkupsCore")
  //       .then((ext: any) => {
  //         ext.removeEventListener(
  //           //@ts-ignore
  //           Autodesk.Viewing.Extensions.Markups.Core.EVENT_EDITMODE_ENTER,
  //           handleMarkupsFinished
  //           // { once: true }
  //         );
  //       });
  //   };
  // }, [viewer.current, markupsDataIsSuccess]);
  //@ts-ignore
  // console.log(Autodesk.Viewing.Extensions.Markups.Core);

  React.useEffect(() => {
    if (!viewer.current) {
      return;
    }

    const handleMarkupsFinished = async (ext: any) => {
      if (
        ext.type === "EVENT_EDITMODE_LEAVE" &&
        ext.target.markups.length !== 0
      ) {
        const markupsStringData = ext?.target?.generateData();
        const markupsInfo: CreateMarkupDto = {
          projectId: projectId,
          filesVersionId: path?.id,
          pageNumber: pageNumber ? pageNumber : 1,
          markupsString: markupsStringData,
          id: "",
          createdAt: "",
        };
        createMarkups.mutate(markupsInfo); //insert into db

        // 👇️ delete each query param
        // searchParams.delete("page");

        // 👇️ update state after
        // setSearchParams(searchParams);

        setIsMarkups(!isMarkups);
        setPageNumber(0);
      }
    };

    viewer.current
      .loadExtension("Autodesk.Viewing.MarkupsCore")
      .then((ext: any) => {
        ext.addEventListener(
          //@ts-ignore
          Autodesk.Viewing.Extensions.Markups.Core.EVENT_EDITMODE_LEAVE,
          handleMarkupsFinished
        );
      });

    return () => {
      viewer?.current
        ?.loadExtension("Autodesk.Viewing.MarkupsCore")
        .then((ext: any) => {
          ext.removeEventListener(
            //@ts-ignore
            Autodesk.Viewing.Extensions.Markups.Core.EVENT_EDITMODE_LEAVE,
            handleMarkupsFinished
          );
        });
    };
  }, [viewer.current, isMarkups]);

  React.useEffect(() => {
    viewer?.current?.addEventListener(
      Autodesk.Viewing.TOOL_CHANGE_EVENT,
      async (x) => {
        const extension = (await viewer?.current?.loadExtension(
          "Autodesk.Viewing.MarkupsCore"
        )) as any;

        if (x.active && x.toolName === "markups.core" && markupsData?.id) {
          await extension?.leaveEditMode();
          //@ts-ignore
          await extension.loadMarkups(
            `${markupsData?.markupsString}`,
            "layer_1"
          );
          await extension.enterEditMode("layer_1");
          // await extension.show(); //it loads the markups even without 'await extension.show()'
          setIsMarkups(false);
        }
      }
    );
  }, [markupsDataIsSuccess]);

  return (
    <Box>
      {path.id ? (
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

function getAllMarkups(viewer: Autodesk.Viewing.GuiViewer3D | undefined) {
  if (!viewer) {
    return;
  }
  const extension = viewer?.getExtension("Autodesk.Viewing.MarkupsCore");
  //@ts-ignore
  const markupsStringData = extension?.generateData();
  return markupsStringData;
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

function getMeasure(viewer: Autodesk.Viewing.GuiViewer3D | undefined) {
  if (!viewer) {
    return;
  }

  const allMs = viewer
    .getExtension("Autodesk.Measure")
    //@ts-ignore

    .measureTool.getMeasurementList();

  return allMs;
}

interface Pick {
  intersection: {
    x: number;
    y: number;
    z: number;
  };
}
interface InputObj {
  picks: Pick[];
}

function generateMeasureId(data: InputObj) {
  const { picks } = data;
  const intersections = picks
    .slice(0, 2)
    .map((pick) => `${pick.intersection.x},${pick.intersection.y}`);
  return intersections.join(",");
}

async function activateMarkups(viewer: any, markups: any) {
  const ext = await viewer.loadExtension("Autodesk.Viewing.MarkupsCore");

  console.log(markups, ext);
  ext.show();
  ext.loadMarkups(markups, "layer_1");
  ext.enterEditMode("layer_1");
}
