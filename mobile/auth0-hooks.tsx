import { useState, useEffect, useGlobal } from "reactn";
import { AuthSession } from "expo";
import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";

import { config } from "./config";

interface IParams {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  nonce: string;
}

/**
 * Converts an object to a query string.
 */
const toQueryString: (x: IParams) => string = (params: IParams): string => {
  return `?${Object.entries(params)
    .map(
      ([key, value]: any) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&")}`;
};

export const useAuth0: any = () => {
  const [isAuthenticated, setIsAuthenticated]: any = useState(false);
  const [user, setUser]: any = useGlobal("user");
  //const [auth0Client, setAuth0]: any = useState<undefined>();
  //const [, setAuth0]: any = useState<undefined>();
  const [loading, setLoading]: any = useState(true);
  //const [popupOpen, setPopupOpen]: any = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      //setAuth0(undefined);

      setIsAuthenticated(undefined);

      if (true || isAuthenticated) {
        try {
          const token: any = await AsyncStorage.getItem("@SWOLY:token");
          if (token !== null) {
            const jwtToken: string = token;
            const decoded: any = jwtDecode(jwtToken);
            setUser(decoded);
            setIsAuthenticated(true);
          }
        } catch {
          setUser(undefined);
        }
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithRedirect = async () => {
    const redirectUrl: string = AuthSession.getRedirectUrl();

    // Structure the auth parameters and URL
    const queryParams: string = toQueryString({
      client_id: config.AUTH0_CLIENT_ID,
      nonce: "nonce", // this will be a random value
      redirect_uri: redirectUrl,
      response_type: "id_token", // id_token will return a JWT token
      scope: "openid profile" // retrieve the user's profile
    });
    const authUrl: string = `${config.AUTH0_DOMAIN}/authorize${queryParams}`;

    // Perform the authentication
    const response: any = await AuthSession.startAsync({ authUrl });
    console.log("Authentication response", response);

    if (response.type === "success") {
      if (response.error) {
        return;
      }

      // Retrieve the JWT token and decode it
      const jwtToken: string = response.params.id_token;
      try {
        console.log(jwtToken);
        await AsyncStorage.setItem("@SWOLY:token", jwtToken);
        const decoded: any = jwtDecode(jwtToken);
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        // Error saving data
      }
    }
  };

  /*const handleRedirectCallback = async () => {
    setLoading(true);
    const result = await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);

    return result;
    return undefined;
  };
  */

  const getTokenSilently = async () => {
    // TODO Change to actually find and get new token from auth0
    return AsyncStorage.getItem("@SWOLY:token");
  };

  const logout = async () => {
    await AsyncStorage.setItem("@SWOLY:token", "");
    setIsAuthenticated(false);
    setUser(undefined);
  };

  return {
    getTokenSilently,
    isAuthenticated,
    loading,
    loginWithRedirect,
    user,
    logout
  };
};
