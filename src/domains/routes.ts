import type  { RouteObject } from 'react-router-dom';

export interface RoutesObject extends RouteObject{
  auth?: boolean;
  name?: string;
  uid?:string;
  children?: RoutesObject[];
} ;
