export class BaseResponse<TData> {
  success!: boolean;
  message!: string;
  data!: TData;
}
