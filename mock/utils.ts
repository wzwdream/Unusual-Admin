/**
 * @description: 错误响应结构
 * @returns {*}
 */
export function resultError(
  message = 'Request failed',
  { code = -1, data = null } = {},
) {
  return {
    code,
    data,
    message
  }
}

/**
 * @description: 成功响应结构
 * @returns {*}
 */
export function resultSuccess<T>(data: T, total?: number) {
  return {
    code: 200,
    data,
    total
  }
}

export interface requestParams {
  method: string
  body: Record<string, string>
  headers?: { authorization?: string }
  query: any
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 * @return token
 */
export function getRequestToken({
  headers,
}: requestParams): string | undefined {
  return headers?.authorization
}
