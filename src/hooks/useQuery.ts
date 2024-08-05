import { useLocation } from "react-router-dom";

export interface useQueryFn {
  (): URLSearchParams;
}

const useQuery: useQueryFn = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

export default useQuery;
