import { PaginationProps } from "antd";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

type IRouterMode = 'on' | 'off';

export const usePagination = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const initRouter = (mode: IRouterMode) => {
    Router.events[mode]('routeChangeStart', () => setIsLoading(true));
    Router.events[mode]('routeChangeComplete', () => setIsLoading(false));
    Router.events[mode]('routeChangeError', () => setIsLoading(false));
  };

  const navigate: PaginationProps['onChange'] = async (page: number) => {
    router.push(`/?page=${page}`)
  }
  
  useEffect(() => {
    initRouter('on');
    return () => {
      initRouter('off');
    }
  }, []);

  useEffect(() => {
    const { page } = router.query;
    setPage(Number(page));
  }, [router.query])

  return {
    isLoading,
    page,
    navigate
  }
}