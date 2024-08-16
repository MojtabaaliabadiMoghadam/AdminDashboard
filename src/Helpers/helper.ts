import axios from 'axios'
import { toast } from 'vue3-toastify'
const API_BASE_URL = 'http://185.147.160.121'
// const API_BASE_URL = 'http://localhost:8000'
import { toJalaali } from 'jalaali-js'
// Function to create an Axios instance with initial settings

function createAxiosInstance(token:string, authorization:boolean) {
    const headers = {};

    // Conditionally add the Authorization header
    if (authorization && token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    const instance = axios.create({
        baseURL: API_BASE_URL,
        headers,
    })

    // Interceptor to handle responses
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('Request Error:', error)
            return Promise.reject(error)
        }
    )
    return instance
}

// Main function to fetch data with options object
export async function fetchData(options:any) {
    const {
        endpoint = '',
        method = 'GET',
        data = null,
        params = {},
        authorization = false
    } = options
    // Retrieve the token from localStorage if needed
    const storedToken = authorization ? localStorage.getItem('authorization') : null
    // Create Axios instance with or without authorization
    const axiosInstance = createAxiosInstance(storedToken, authorization)

    // Send the request
    try {
        const response = await axiosInstance.request({
            url: endpoint,
            method,
            data,
            params, // Add query parameters
        })
        // Return response on success
        return {
            status: response.data.status,      // HTTP status
            message: response.data.message, // HTTP status message
            data: response.data.data// Response data
        }
    } catch (error) {
        // Handle errors and return them
        console.error('API Call Error:', error);
        throw error;
    }
}
export function showSuccessToast(message: string) {
    toast.success(message, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
    })
}
export function showErrorToast(message: string) {
    toast.error(message, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
    })
}
export function formatDate(isoString:any) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}

export function formatDateToJalali(isoString:any) {
    const date = new Date(isoString);

    const gregorianYear = date.getUTCFullYear();
    const gregorianMonth = date.getUTCMonth() + 1;
    const gregorianDay = date.getUTCDate();

    const { jy: jalaliYear, jm: jalaliMonth, jd: jalaliDay } = toJalaali(
        gregorianYear,
        gregorianMonth,
        gregorianDay
    );

    return `${jalaliYear}/${jalaliMonth.toString().padStart(2, '0')}/${jalaliDay.toString().padStart(2, '0')}`;
}