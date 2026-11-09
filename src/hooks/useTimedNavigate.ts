import { useNavigate } from "react-router";

export const useTimedNavigate = () => {
  const navigate = useNavigate();

  const timedNavigate = (targetUrl: string) => {
    setTimeout(() => {
      navigate(targetUrl);
    }, 3000);
  };

  return { timedNavigate };
};
