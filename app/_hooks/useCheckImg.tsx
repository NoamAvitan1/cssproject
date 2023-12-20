import axios from "axios";

export const useCheckImg = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url);
    return true;
  } catch (error) {
    return false;
  }
};
