let PRODUCT = 'products/';
let api_url = 'api/';
let delete_url = 'delete/';
let update_url = 'update/';
let DETAIL_PRODUCT = 'detail/';

export const BASE_URLS_PRODUCT ={
    REGISTER_PRODUCT: `${PRODUCT}register/`,
    GET_PRODUCT: `${api_url}${PRODUCT}list/`,
    DELETE_PRODUCT: `${api_url}${PRODUCT}${delete_url}`,
    UPDATE_PRODUCT: `${api_url}${PRODUCT}${update_url}`,
    DETAIL_PRODUCT: `${api_url}${PRODUCT}${DETAIL_PRODUCT}`,
}