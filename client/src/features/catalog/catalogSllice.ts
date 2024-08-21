import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsynk = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async(_, thunkAPI) => {
        try{
            return await agent.Catalog.list();
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProductAsynk = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async(productId, thunkAPI) => {
        try{
            const product = await agent.Catalog.details(productId);
            return product;
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers:(builder => {
        builder.addCase(fetchProductsAsynk.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsynk.fulfilled, (state, action)=>{
            productAdapter.setAll(state, action.payload);
            state.status ='idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsynk.rejected, (state, action)=>{
            console.log(action.payload);
            state.status = 'idle'
        });
        builder.addCase(fetchProductAsynk.pending, (state) =>{
            state.status = 'pendingFetchProduct'
        });
        builder.addCase(fetchProductAsynk.fulfilled, (state, action) =>{
            productAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsynk.rejected, (state, action) =>{
            console.log(action);
            state.status = 'idle';
        })
    })
})

export const ptoductSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);