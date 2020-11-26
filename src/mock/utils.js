export function builder(data, message, code) {
  const response = {
    result: data,
    code: code,
    message: message,
    _status: code,
    timestamp: new Date().getTime()
  };
  return response;
}
