import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import {
  Clear as ClearIcon,
  CreateNewFolder as CreateNewFolderIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
} from "@material-ui/icons";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "transparent",
      },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelInfo,
    color,
    bgColor,
    folderId,
    handleDeleteFolder,
    currentFolder: { currentFolderName } = {},
    ...other
  } = props;
  const LabelIcon =
    labelText === currentFolderName ? FolderOpenIcon : FolderIcon;
  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
          {labelText !== "All" && (
            <DeleteIcon
              color="inherit"
              className={classes.labelIcon}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteFolder(folderId);
              }}
            />
          )}
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

const useStyles = makeStyles({
  root: {},
  createContainer: {
    display: (props) => (props.isCreating ? "block" : "flex"),
  },
  createFolderIcon: {
    padding: 5,
  },
  folderInput: {
    width: "100%",
    marginLeft: 10,
    marginBottom: 10,
  },
  folderLabel: {
    paddingLeft: 10,
  },
  tree: {
    flexGrow: 1,
    maxWidth: 300,
  },
});

export default function Folders({
  allFolders,
  selectedFolder,
  handleAddFolder,
  handleDeleteFolder,
  handleSelectFolder,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderText, setNewFolderText] = useState("");

  const classes = useStyles({ isCreating });

  const createNewFolder = async () => {
    setIsCreating(false);
    setNewFolderText("");
    // TODO: loading indicator?
    await handleAddFolder(newFolderText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createNewFolder();
    }
  };

  const Folders = allFolders.map((folder) => {
    const { folderName, folderId } = folder;
    return (
      <StyledTreeItem
        key={folderName}
        currentFolder={selectedFolder}
        nodeId={folderName}
        labelText={folderName}
        folderId={folderId}
        handleDeleteFolder={handleDeleteFolder}
      />
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.createContainer}>
        <Typography
          className={classes.folderLabel}
          variant="h5"
          color="inherit"
          size="small"
        >
          Folders
        </Typography>
        {isCreating ? (
          <div>
            <FormControl onKeyPress={handleKeyPress}>
              <Input
                size="small"
                id="standard-adornment-create-folder"
                type="text"
                value={newFolderText}
                className={classes.folderInput}
                onChange={(e) => setNewFolderText(e.target.value)}
                inputProps={{ maxLength: 15 }}
                autoFocus={true}
                endAdornment={
                  <>
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="submit"
                        onClick={createNewFolder}
                      >
                        <DoneIcon />
                      </IconButton>
                    </InputAdornment>
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="submit"
                        onClick={() => {
                          setNewFolderText("");
                          setIsCreating(false);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  </>
                }
              />
            </FormControl>
          </div>
        ) : (
          <div>
            <IconButton
              className={classes.createFolderIcon}
              aria-label="new"
              onClick={() => setIsCreating(true)}
            >
              <CreateNewFolderIcon />
            </IconButton>
          </div>
        )}
      </div>
      <TreeView
        className={classes.tree}
        selected={selectedFolder.folderName}
        onNodeSelect={(e, nodeId) => {
          if (nodeId !== "All") {
            const newFolder = allFolders.find(
              (folder) => folder.folderName === nodeId
            );
            handleSelectFolder(newFolder);
          } else {
            handleSelectFolder({
              folderName: "All",
              displayOrder: 0,
            });
          }
        }}
      >
        <StyledTreeItem
          currentFolder={selectedFolder}
          nodeId="All"
          labelText="All"
        />
        {Folders}
      </TreeView>
    </div>
  );
}
