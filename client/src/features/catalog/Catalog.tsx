import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsynk, ptoductSelectors } from "./catalogSllice";



export default function Catalog(){
    const products = useAppSelector(ptoductSelectors.selectAll);
    const {productsLoaded,status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
  

  useEffect(() => {
    if(!productsLoaded) dispatch(fetchProductsAsynk());
  }, [productsLoaded, dispatch])

  if(status.includes('pending')) return <LoadingComponent message="Loading products..."/>

  return(
    <>
      <ProductList products={products}/>
    </>
  )
}