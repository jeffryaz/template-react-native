import { actionTypes } from "./configLayout";

export const actions = {
    setDevicesUniqueId: (devicesUniqueId: any) => ({ type: actionTypes.DevicesUniqueId, payload: { devicesUniqueId } }),
};
