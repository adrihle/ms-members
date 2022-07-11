import { PaginationProps } from "antd";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

type IRouterMode = 'on' | 'off';

export const usePagination = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { query: { page: queryPage } } = router;

  const initRouter = useCallback((mode: IRouterMode) => {
    Router.events[mode]('routeChangeComplete', () => setIsLoading(false));
    Router.events[mode]('routeChangeError', () => setIsLoading(false));
  }, []);


  const navigate: PaginationProps['onChange'] = async (page: number) => {
    setIsLoading(true);
    router.push(`/?page=${page}`)
  }
  
  useEffect(() => {
    initRouter('on');
    return () => {
      initRouter('off');
    }
  }, [initRouter]);

  useEffect(() => {
    setPage(Number(queryPage));
  }, [queryPage, page])

  return {
    isLoading,
    page,
    navigate
  }
}