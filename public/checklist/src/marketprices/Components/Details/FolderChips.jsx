import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, FormControl, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: 0,
  },
  folderChip: {
    margin: 10,
    marginRight: 0,
  },
  selectOption: {
    backgroundColor: "#fff",
  },
}));

export default function FolderChips({
  folderMembership,
  allFolders,
  handleFolderMembershipChange,
}) {
  const classes = useStyles();
  const [newFolderSelect, setNewFolderSelect] = useState("default");

  const handleAdd = (newFolder) => {
    const currentFolderNames = folderMembership.map(
      (folder) => folder.folderName
    );
    if (currentFolderNames.includes(newFolder.folderName)) {
      setNewFolderSelect("default");
      return; // No duplicates
    }

    let newFolders = folderMembership.slice();
    newFolders.push(newFolder);
    handleFolderMembershipChange(newFolders);
    setNewFolderSelect("default");
  };

  const handleDelete = (deletedFolder) => {
    const newFolders = folderMembership.filter(
      (folder) => folder.folderName !== deletedFolder.folderName
    );
    handleFolderMembershipChange(newFolders);
  };

  const foldersArray = allFolders.map((folder) => {
    const { folderName } = folder;
    return (
      <MenuItem key={folderName} value={folderName}>
        {folderName}
      </MenuItem>
    );
  });

  const folderMembershipJsx = folderMembership.map((folder) => {
    const { folderName } = folder;
    return (
      <Chip
        className={classes.folderChip}
        key={folderName}
        value={folder}
        label={folderName}
        onDelete={() => handleDelete(folder)}
      />
    );
  });

  return (
    <>
      <FormControl size="small" className={classes.formControl}>
        <Select
          className={classes.selectOption}
          variant="outlined"
          labelId="condition-select-label"
          id="condition-select"
          value={newFolderSelect}
          onChange={(e) => {
            const newFolder = allFolders.find(
              (folder) => folder.folderName === e.target.value
            );
            setNewFolderSelect(newFolder.folderName);
            handleAdd(newFolder);
          }}
        >
          <MenuItem disabled={true} value="default">
            Add to folder...
          </MenuItem>
          {foldersArray}
        </Select>
      </FormControl>
      <div>{folderMembershipJsx}</div>
    </>
  );
}
