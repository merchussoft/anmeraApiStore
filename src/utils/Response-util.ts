export const queryResult = <T>(data: T, message='Query executed successfully',statusCode = 200) => {
    return {
        statusCode,
        message,
        data,
    }
}