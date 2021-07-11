/* eslint-disable fp/no-this */
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-class */
export class ResourceNotFound extends Error {
  private resourceIds: string;
  constructor(resourceId: string, message: string) {
    super(message);
    this.name = 'ResourceNotFound';
    this.resourceIds = resourceId;
  }
}
