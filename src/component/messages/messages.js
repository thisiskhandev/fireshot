import { message } from "antd";

export const Success = (messages) => {
    message.success({
        content: messages,
        duration: 1,
        style: {
            marginTop: '15vh',
        },
    });
}
export const Error = (messages) => {
    message.error({
        content: messages,
        duration: 1,
        style: {
            marginTop: '15vh',
        },
    });
}
