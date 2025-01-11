import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'http://192.168.1.106:3000/';

console.log('BASE_URL', BASE_URL);

class NetworkManager {
  private static instance: NetworkManager;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = '';
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): NetworkManager {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager();
    }
    return NetworkManager.instance;
  }

  async get<T>(endpoint: string, params?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(endpoint, {
        params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(endpoint: string, data?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(endpoint: string, data?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      return new Error(errorMessage);
    }
    return error;
  }
}

export const networkManager = NetworkManager.getInstance();
