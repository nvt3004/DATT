import {
    Button,
    CloseButton,
    Table,
    TextInput,
    Modal,
    Select,
    Text,
} from "@mantine/core";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

function DanhSachChuyenVien() {
    const [opened, { open, close }] = useDisclosure(false);
    const [listData, setListData] = useState<string | any>([]);
    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            ten: "",
            email: "",
            danhXungTen: "",
            soDienThoai: "",
        },
        validate: {
            ten: isNotEmpty("Họ và tên không được để trống"),
            danhXungTen: isNotEmpty("Danh xưng không được để trống"),
            soDienThoai: (value) => {
                if (!value) {
                    return "Số điện thoại không được để trống";
                }
                if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
                    return "Số điện thoại không hợp lệ";
                }
                return null;
            },
            email: isEmail("Email không hợp lệ"),
        },
    });
    const openDeleteModal = (id : number | string) =>  {        
     return   modals.openConfirmModal({
            title: "Xóa dữ liệu",
            centered: true,
            children: (
                <Text size="sm">
                    Bạn có chắc chắn muốn xóa hồ sơ của mình không? Hành động
                    này có tính hủy hoại và bạn sẽ phải liên hệ với bộ phận hỗ
                    trợ để khôi phục dữ liệu của mình..
                </Text>
            ),
            labels: { confirm: "Xóa", cancel: "Hủy" },
            confirmProps: { color: "red" },
            onCancel: () => console.log("Cancel"),
            onConfirm: async () => {
                notifications.show({
                    color: "teal",
                    title: "THÔNG BÁO",
                    message: "Dữ liệu đã xóa thành công",
                });
                await removeElementById(id);
            },
        });
    }
      
    const removeElementById = async (id : string | number) => {     
        const updatedElements = await listData.filter(
            (element: any | string) => element.id !== id
        );
        setListData(updatedElements);
        
    };
    const handleRemove = (id: string | number) => {
        openDeleteModal(id);
    };
    const submitAddNoidung = (values: typeof form.values | any) => {
        values.id = listData.length + 1;
        setListData((prevArray: any) => [...prevArray, values]);
        form.reset();
    };
    const rows4 = listData.map((element: string | any, index: number) => (
        <Table.Tr key={element.id}>
            <Table.Td className="text-center">{index + 1}</Table.Td>
            <Table.Td>{element.ten}</Table.Td>
            <Table.Td>{element.danhXungTen}</Table.Td>
            <Table.Td>{element.soDienThoai}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
            <Table.Td>
                <div
                    className="flex items-center justify-center"
                    onClick={() => {
                        handleRemove(element.id);
                       
                    }}
                >
                    <CloseButton size="lg" />
                </div>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <div>
                <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                    className="mt-3"
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th className="text-center">STT</Table.Th>
                            <Table.Th className="text-center">
                                Họ và tên
                            </Table.Th>
                            <Table.Th className="text-center">
                                Danh xưng
                            </Table.Th>
                            <Table.Th className="text-center">
                                Số điện thoại
                            </Table.Th>
                            <Table.Th className="text-center">Email</Table.Th>
                            <Table.Th className="text-center">#</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows4}</Table.Tbody>
                </Table>
                <Modal opened={opened} onClose={close} title="THÊM CHYYÊN VIÊN">
                    <form onSubmit={form.onSubmit(submitAddNoidung)}>
                        <TextInput
                            withAsterisk
                            label="Họ và tên"
                            placeholder="Nhập họ và tệ"
                            key={form.key("ten")}
                            {...form.getInputProps("ten")}
                            className=" mt-2"
                        />{" "}
                        <TextInput
                            withAsterisk
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            key={form.key("soDienThoai")}
                            {...form.getInputProps("soDienThoai")}
                            className=" mt-2"
                        />
                        <TextInput
                            withAsterisk
                            label="Email"
                            placeholder="Nhập email"
                            key={form.key("email")}
                            {...form.getInputProps("email")}
                            className=" mt-2"
                        />
                        <Select
                            label="Danh xưng"
                            placeholder="Chọn ..."
                            withAsterisk
                            data={["Cơ bản", "Tiêu chuẩn"]}
                            key={form.key("danhXungTen")}
                            {...form.getInputProps("danhXungTen")}
                            style={{ width: "100%" }}
                            className="mr-4 mt-2"
                        />
                        <Button
                            variant="filled"
                            color="cyan"
                            type="submit"
                            className="mt-3"
                        >
                            Xác nhận
                        </Button>
                    </form>
                </Modal>
                <Button
                    variant="outline"
                    
                    className="mt-3"
                    size="sm"
                    onClick={open}
                >
                    <IconPlus stroke={2} />
                    THÊM CHUYÊN VIÊN
                </Button>
            </div>
        </>
    );
}

export default DanhSachChuyenVien;
