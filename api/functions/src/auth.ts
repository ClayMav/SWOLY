export const authChecker: any = async (
  { context }: { context: any },
  roles: string[]
) => {
  const user: any | undefined = context.state.user;
  if (process.env.NODE_ENV === "development") {
    const username = user ? user.email : undefined;
    console.debug("[auth] Skipping permission check (development mode)...");
    console.info(`[auth] Currently logged in as ${username}`);

    return true;
  }

  // if `@Authorized()`, check only is user exist
  if (roles.length === 0) {
    return user !== undefined;
  }
  // there are some roles defined now

  // See if user/machine application has necessary scopes.
  // A machine application will not have a state.user, therefore,
  // this check must come first
  if (context.state.scope) {
    const scopes: string[] = context.state.scope.split(" ");

    if (scopes.includes("all")) {
      return true;
    }

    if (scopes.some((scope: string) => roles.includes(scope))) {
      // grant access if the roles overlap
      return true;
    }
  }

  // and if no user, restrict access
  if (!user) {
    return false;
  }

  // no roles matched, restrict access
  return false;
};
