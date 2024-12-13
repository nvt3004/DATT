import {  Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

const OpenCustomConfirmModal = ({
    id,
    title = "Xóa dữ liệu",
    message = "Bạn có chắc chắn muốn xóa hồ sơ của mình không? Hành động này có tính hủy hoại và bạn sẽ phải liên hệ với bộ phận hỗ trợ để khôi phục dữ liệu của mình.",
    confirmLabel = "Xóa",
    cancelLabel = "Hủy",
    onConfirmAction = async () => {}, 
    confirmColor = "red",
} : any ) => {
    
    return modals.openConfirmModal({
        title: title,
        centered: true,
        children: (<Text> {message}</Text>),
        labels: { confirm: confirmLabel, cancel: cancelLabel },
        confirmProps: { color: confirmColor },
        onCancel: () => console.log("Cancel"),
        onConfirm: async () => {
            await onConfirmAction(id); 
            notifications.show({
                color: confirmColor,
                title: "THÔNG BÁO",
                message: "Dữ liệu đã xóa thành công",
                autoClose: 3000,
                position: "top-right",
            });
        },
    });
};
export default OpenCustomConfirmModal