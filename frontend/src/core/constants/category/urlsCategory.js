let CATEGORY = 'category/';
let api_url = 'api/';
let delete_url = 'delete/';
let update_url = 'update/';

export const BASE_URLS_CATEGORY = {
    REGISTER_CATEGORY: `${CATEGORY}register/`,
    GET_CATEGORY: `${api_url}${CATEGORY}list/`,
    UPDATE_CATEGORY: `${api_url}${CATEGORY}${update_url}`,
    DELETE_CATEGORY: `${api_url}${CATEGORY}${delete_url}`,
};