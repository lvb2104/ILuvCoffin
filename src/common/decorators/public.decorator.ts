import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// use SetMetadata to define metadata for the route handler to mark it as public and allow access to it without authentication
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
