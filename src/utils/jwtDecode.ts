import { jwtDecode } from 'jwt-decode'; 


// Function to get userId from the access token
export const getUserIdFromToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded,"decoded payload from accesstoken")
    return decoded?.id; // Assuming your token has the userId in its payload
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};