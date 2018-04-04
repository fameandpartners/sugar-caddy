import path from 'path';
import {
  UPLOAD_ITEM_FAILURE,
  UPLOAD_ITEM_START,
  UPLOAD_ITEM_SUCCESS,
} from 'constants/uploads';
import s3 from 'utils/s3';

export const failUploadItem = id => ({
  type: UPLOAD_ITEM_FAILURE,
  payload: id,
});

export const startUploadItem = file => ({
  type: UPLOAD_ITEM_START,
  payload: file,
});

export const finishUploadItem = id => ({
  type: UPLOAD_ITEM_SUCCESS,
  payload: id,
});

export const uploadItem = (file, fileId) => dispatch => new Promise((fulfill, reject) => {
  dispatch(startUploadItem({ id: fileId, ...file }));
  const ext = path.extname(file.name);
  s3.upload(
    {
      Key: `${fileId}${ext}`,
      Body: file,
      ACL: 'public-read',
    },
    (err, data) => {
      if (err) {
        dispatch(failUploadItem(fileId));
        return reject(err);
      }
      dispatch(finishUploadItem(fileId));
      return fulfill(data);
    },
  );
});
