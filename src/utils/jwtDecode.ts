import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  id: string; 
}

// Function to get userId from the access token
export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token); 
    console.log(decoded, "decoded payload from accessToken");
    return decoded.id; 
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};