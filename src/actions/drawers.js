import { OPEN_DRAWER, CLOSE_DRAWER } from 'constants/drawers';

export const openDrawer = (name, data) => ({
  type: OPEN_DRAWER,
  payload: { name, data },
});

export const closeDrawer = () => ({
  type: CLOSE_DRAWER,
});
