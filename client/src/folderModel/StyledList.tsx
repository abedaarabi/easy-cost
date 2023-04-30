import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SvgIconProps } from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { display } from "@mui/system";
declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  iconColor?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  version?: boolean;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  //   [`& .${treeItemClasses.group}`]: {
  //     marginLeft: 0,
  //     [`& .${treeItemClasses.content}`]: {
  //       paddingLeft: theme.spacing(2),
  //     },
  //   },
}));

export function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    version,
    bgColor,
    color,
    iconColor,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color={iconColor} sx={{ mr: 1 }} />
          <Typography
            variant={version ? "overline" : "caption"}
            sx={{ flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="overline" color="#463f3a">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

//    <Box mt={2}>
//      {data.map((item) => (
//        <Box
//          key={item.id}
//          onClick={() => {
//            getFilePath(item.urlPath);
//            handleClose();
//          }}
//        >
//          <StyledTreeItem
//            labelText={item.fileName}
//            labelInfo={String(item.size) + " " + "MB"}
//            labelIcon={
//              imageFormat.find((i) => item.fileName.endsWith(i))
//                ? WallpaperIcon
//                : PictureAsPdfIcon
//            }
//            bgColor={
//              imageFormat.find((i) => item.fileName.endsWith(i))
//                ? "#f3e8fd"
//                : "green"
//            }
//            nodeId={""}
//          />
//        </Box>
//      ))}
//    </Box>;

// <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
//   <ListItemButton
//     key={item.id}
//     onClick={() => {
//       getFilePath(item.urlPath);
//       handleClose();
//     }}
//   >
//     <ListItemIcon>
//       {imageFormat.find((i) => item.fileName.endsWith(i)) ? (
//         <WallpaperIcon color="secondary" />
//       ) : (
//         <PictureAsPdfIcon color="error" />
//       )}
//     </ListItemIcon>
//     <ListItemText primary={item.fileName} />
//   </ListItemButton>
//   <Typography variant="caption" color="inherit">
//     {String(item.size) + " " + "MB"}
//   </Typography>
// </Box>;
