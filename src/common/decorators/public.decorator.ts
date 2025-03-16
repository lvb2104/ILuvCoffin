import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// SetMetadata('key', 'value') is a built-in method from the @nestjs/common package that allows you to define metadata for a route handler
// use SetMetadata to define metadata for the route handler to mark it as public and allow access to it without authentication
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
