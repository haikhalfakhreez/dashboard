export type ActionResponse<TData> =
  | {
      success: true
      data: TData
    }
  | {
      success: false
      message: string
    }
