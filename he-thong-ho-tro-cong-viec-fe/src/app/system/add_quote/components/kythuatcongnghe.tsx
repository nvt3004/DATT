import {
    Button,
    CloseButton,
    Input,
    Table,
    Modal,
    TextInput,
    Select,
    NumberInput,
    Text,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

function KyThuatCongNghe() {
    const [opened, { open, close }] = useDisclosure(false);
    const [listData, setListData] = useState<string | any>([]);

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        initialValues: {
            ten: "",
            mota: "",
        },
        validate: {
            ten: isNotEmpty("Kỹ thuật công nghệ không được để trống"),
            mota: isNotEmpty("Nội dung không được để trống"),
        },
    });
    const openDeleteModal = (id: number | string) => {
        return modals.openConfirmModal({
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
    };
    const removeElementById = async (id: string | number) => {
        const updatedElements = await listData.filter(
            (element: any | string) => element.id !== id
        );
        setListData(updatedElements);
    };
    const submitAddNoidung = (values: typeof form.values | any) => {
        values.id = listData.length + 1;
        setListData((prevArray: any) => [...prevArray, values]);
        form.reset();
    };
    const handleRemove = (id: string | number) => {
        openDeleteModal(id);
    };
    const rows3 = listData.map((element: string | any, index: number) => (
        <Table.Tr key={element.id}>
            <Table.Td className="text-center">{index + 1}</Table.Td>
            <Table.Td width={"60%"}>{element.mota}</Table.Td>
            <Table.Td className="text-center">{element.ten}</Table.Td>

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
            <div className=" bg-[#eceef0] p-4 rounded mt-3">
                <Input.Label required>Kỹ thuật công nghệ</Input.Label>
                <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th className="text-center">STT</Table.Th>
                            <Table.Th className="text-center">
                                Nội dung
                            </Table.Th>
                            <Table.Th className="text-center">
                                Kỹ thuật - công nghệ
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows3}</Table.Tbody>
                </Table>
                <Modal
                    opened={opened}
                    onClose={close}
                    title="THÊM NỘI DUNG KỸ THUẬT CÔNG NGHỆ"
                >
                    <form onSubmit={form.onSubmit(submitAddNoidung)}>
                        <TextInput
                            withAsterisk
                            label="Nội dung"
                            placeholder="Nhập nội dung công nghệ"
                            key={form.key("mota")}
                            {...form.getInputProps("mota")}
                            className=" mt-2"
                        />{" "}
                        <TextInput
                            withAsterisk
                            label="Kỹ thuật công nghệ"
                            placeholder="Nhập kỹ thuật công nghệ"
                            key={form.key("ten")}
                            {...form.getInputProps("ten")}
                            className=" mt-2"
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
                    THÊM NỘI DUNG
                </Button>
            </div>
        </>
    );
}

export default KyThuatCongNghe;
