import { Method, AxiosRequestConfig } from 'axios'


export interface BaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  multiple?: boolean;
  accept?: string;
}

export interface UploadOptions extends AxiosRequestConfig {
  url: string;
  method?: Method;
  requestData?: object;
  fileFormDataKey?: string;
}
