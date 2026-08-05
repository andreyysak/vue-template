import { useAppStore } from '@/store/app';
import { REQUEST_STATUS, STORE_DATA_STATUS } from '@/utils/constants';

export const setRequestStatus = (storeDataStatus, type, error = null) => {
  if (type === REQUEST_STATUS.RUN) {
    storeDataStatus[STORE_DATA_STATUS.LOADING] = true;
    storeDataStatus[STORE_DATA_STATUS.DONE] = false;
    storeDataStatus[STORE_DATA_STATUS.ERROR] = null;
  } else if (type === REQUEST_STATUS.SUCCESS) {
    storeDataStatus[STORE_DATA_STATUS.DONE] = true;
  } else if (type === REQUEST_STATUS.ERROR) {
    storeDataStatus[STORE_DATA_STATUS.ERROR] = error;
  } else if (type === REQUEST_STATUS.DONE) {
    storeDataStatus[STORE_DATA_STATUS.LOADING] = false;
  }
};

export const getRequestError = (e) => {
  return e.errors ? e.errors : e.message ? e.message : e.error ? e.error : e;
};

export const setAppLoader = (status) => {
  const appStore = useAppStore();
  appStore.SET_LOADER_STATUS(status);
};
