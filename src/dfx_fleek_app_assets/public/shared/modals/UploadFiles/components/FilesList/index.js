import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { formatBytes, getFileType } from '@Shared/utils';
import UploadTable from '@Shared/UploadTable/UploadTable';
import SelectFiles from '../SelectFiles';
import useStyles from './styles';

const FilesList = ({
  filesVisualRepresentation,
  files,
  updateSelectedFiles,
  upload,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const removeFile = (fileToRemove) => {
    updateSelectedFiles(
      files.filter(
        (file) => !file.path.startsWith(fileToRemove.id),
      ),
    );
  };

  const addFiles = (newFiles) => {
    updateSelectedFiles([...files, ...newFiles]);
  };

  const cancel = () => {
    updateSelectedFiles([]);
  };

  const head = [t('common.name'), t('common.size')];
  const rows = Object.entries(filesVisualRepresentation).map(([name, fileData]) => ({
    id: name,
    name: name.replace(/^\//, ''),
    size: formatBytes(fileData.size),
    label: fileData.label,
    type: getFileType(name),
  }));

  const onSubmit = (event) => {
    event.preventDefault();
    upload();
  };

  return (
    <form id="UploadFiles" onSubmit={onSubmit}>
      <div className={classes.root}>
        <UploadTable head={head} onRemoveClick={removeFile} rows={rows} />
      </div>
      <div className={classes.buttons}>
        <SelectFiles
          onSelectFiles={addFiles}
          onlyButton
        />
        <GenericButton
          onClick={cancel}
          buttonVariant="secondary"
          className={classes.cancelBtn}
        >
          {t('common.cancel')}
        </GenericButton>
        <GenericButton
          type="submit"
          form="UploadFiles"
          buttonVariant="primary"
        >
          {t('common.confirm')}
        </GenericButton>
      </div>
    </form>
  );
};

FilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  })).isRequired,
  filesVisualRepresentation: PropTypes.shape({}).isRequired,
  updateSelectedFiles: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
};

export default FilesList;
