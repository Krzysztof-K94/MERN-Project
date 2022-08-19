import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resouresUserId) => {
  if(requestUser.admin) return;
  if(requestUser.useId === resouresUserId.toString()) return;
  throw new UnauthenticatedError('Not authorized to access this route')
};
export default checkPermissions;