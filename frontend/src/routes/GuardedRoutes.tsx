import { Redirect } from "react-router-dom";

interface GuardedRoutesProps {
  /**
   * Permission check for route
   * @default false
   */
  isRouteAccessible?: boolean;
  /**
   * Route to be redirected to
   * @default '/'
   */
  redirectRoute?: string;
  children: JSX.Element;
}

/**
 * Component for guarding restricted routes
 *
 * @example Default usage
 * ```ts
 * <GuardedRoute
 *	 isRouteAccessible={true}
 * />
 * ```
 *
 * @example Usage with custom redirected route
 * ```ts
 * <GuardedRoute
 *	 isRouteAccessible={false}
 *	 redirectRoute={'/login'}
 * />
 * ```
 */
const GuardedRoute = ({
  isRouteAccessible = false,
  redirectRoute = "/",
  children,
}: GuardedRoutesProps): JSX.Element =>
  isRouteAccessible ? children : <Redirect to={redirectRoute} />;

export default GuardedRoute;
