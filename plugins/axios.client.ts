import { initializeAxios } from "@/utils/api";

const accessor: any = ({ $axios, $config }: any) => {
  initializeAxios($axios);

  $axios.onRequest((config: any) => {
    config.headers.apikey = $config.apiKey;
  });

  $axios.onError((error: any) => {
    if (error.response === undefined) {
      console.log("Network Error: Please refresh and try again.");
      throw error;
    }
    throw error;
  });
};

export default accessor;
