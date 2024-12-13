"use client";
import {
    Button,
    Card,
    Group,
    Table,
    Box,
    TextInput,
    ActionIcon,
    Checkbox,
    Title,
    Input
} from "@mantine/core";
import {
    IconEdit,
    IconTrash,
    IconPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";

import {
    addProductSeverDetail,
} from "@/store/slices/productseverdetail/productSeverDetailAction";
import Link from "next/link";
import { isNotEmpty, useForm } from "@mantine/form";
import Add_AddThongso_Dialog from "../../parameter/addDialong";
import Add_AddThongsoGround_Dialog from "../../parameter_group/addDialong";
import Add_AddMaychu_Dialog from "../../server/addDialong";
import Add_EditMaychu_Dialog from "../../server/editDialong";
import Edit_Thongso_Dialog from "../../parameter/editDialong";
import Add_EditThongso_Dialog from "../../parameter_group/editDialong";

import { deleteMaychu, fetchMaychu } from "@/store/slices/maychu/maychuAction";
import { deleteThongso, fetchThongso } from "@/store/slices/thongso/thongsoAction";
import { deleteThongsogr, fetchThongsogr } from "@/store/slices/thongsogr/thongsogrAction";
import { notifications } from "@mantine/notifications";
import { useRouter } from 'next/navigation'

const arr = [
    { title: "Trang chủ", href: "/manage" },
    { title: "Quản lý", href: "/manage" },
    { title: "Phần mềm máy chủ", href: "/manage/softwaresever" },
    {
        title: "Thêm phần mềm máy chủ",
        href: "/manage/softwaresever/addsoftwaresever",
    },
];
interface ActiveUserMayChu {
    id: string;
    ten: string;
    moTa: string;
}
export default function PagePage() {
    const router = useRouter()
    // handle open close dialog
    const [dialogOpened, setDialogOpened] = useState(false);
    const [dialogOpenedMayChu, setDialogOpenedMayChu] = useState(false);
    const [dialogOpenedAddThongsoGround, setDialogOpenedAddThongsoGround] =
        useState(false);
    const [activePage, setActivePage] = useState(1);
    const [searchValue, setSearchValue] = useState("100");
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [selectedRowMayChu, setSelectedRowsMayChu] = useState<number[]>([]);
    const [selectedRowThongso, setSelectedRowsThongSo] = useState<number[]>([]);
    const [selectedRowNhomThongso, setSelectedRowsNhomThongSo] = useState<
        number[]
    >([]);
    const [editDialogOpenMayChu, setEditDialogOpenMayChu] = useState(false);
    const [activeUserMayChu, setActiveUserMayChu] = useState<ActiveUserMayChu | undefined>(
        undefined
    );
    const [editDialogOpenThongSo, setEditDialogOpenThongSo] = useState(false);
    const [activeUserThongSo, setActiveUserThongSo] = useState<any | undefined>(
        undefined
    );
    const [editDialogOpenNhomThongSo, setEditDialogOpenNhomThongSo] = useState(false);
    const [activeUserNhomThongSo, setActiveUserNhomThongSo] = useState<any | undefined>(
        undefined
    );

    const maychu = useSelector((state: any) => state.maychu);
    const thongso = useSelector((state: any) => state.thongso);
    const thonsogoup = useSelector((state: any) => state.thongsogr);

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
        validate: {
            value: isNotEmpty("Giá trị không được để trống"),
        },
    });
    useEffect(() => {
        dispatch(fetchMaychu({ activePage, searchValue }));
        dispatch(fetchThongso({ activePage, searchValue }));
        dispatch(fetchThongsogr({ activePage, searchValue }));
    }, [dispatch]);


    const handleSubmit = async (values: typeof form.values | any) => {
        if (!selectedRowMayChu || selectedRowMayChu.length === 0) {
            alert("Chưa chọn máy chủ");
            return;
        }
        if (!selectedRowThongso || selectedRowThongso.length === 0) {
            alert("Chưa chọn thông số");
            return;
        }
        if (!selectedRowNhomThongso || selectedRowNhomThongso.length === 0) {
            alert("Chưa chọn nhóm thông số");
            return;
        }

        const data = {
            giaTri: values.value,
            mayChuId: selectedRowMayChu[0],
            thongSoGroupId: selectedRowNhomThongso[0],
            thongSoId: selectedRowThongso[0],
        };


        try {
            const res = await dispatch(addProductSeverDetail(data));


            if (res.payload.code === 1000) {
                setSelectedRowsMayChu([])
                setSelectedRowsThongSo([])
                setSelectedRowsNhomThongSo([])
                form.reset();
                notifications.show({
                    title: "Thêm thành công",
                    message: "Phần mềm máy chủ đã được thêm.",
                    color: "teal",
                    autoClose: 3000,
                    position: "top-right",
                });
                router.push('/manage/softwaresever')
            } else {
                notifications.show({
                    title: "Thêm thất bại",
                    message: "Phần mềm Máy chủ chưa được thêm.",
                    color: "red",
                    autoClose: 3000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Lỗi khi gọi API. Vui lòng thử lại.");
        }
    };
    const handlerDeleteMayChu = async (id: string) => {
        try {
            await dispatch(deleteMaychu(id));

            dispatch(fetchMaychu({ activePage, searchValue }));
            notifications.show({
                title: "Thành công",
                message: "Xóa thành công!",
                color: "green",
                position: "top-right",
            });
        } catch (error) {
            console.error("Error deleting or fetching:", error);
            notifications.show({
                title: "Lỗi!",
                message: "Có lỗi xảy ra khi xóa máy chủ !",
                color: "green",
                position: "top-right",
            });
        }
    };
    const handlerDeleteThongso = async (id: string) => {
        try {
            await dispatch(deleteThongso(id));

            dispatch(fetchThongso({ activePage, searchValue }));
            notifications.show({
                title: "Thành công",
                message: "Xóa thành công!",
                color: "green",
                position: "top-right",
            });
        } catch (error) {
            console.error("Error deleting or fetching:", error);
            notifications.show({
                title: "Lỗi!",
                message: "Có lỗi xảy ra khi xóa thông số!",
                color: "green",
                position: "top-right",
            });
        }
    };
    const handlerDeleteNhomThongSo = async (id: string) => {
        try {
            await dispatch(deleteThongsogr(id));

            dispatch(fetchThongsogr({ activePage, searchValue }));
            notifications.show({
                title: "Thành công",
                message: "Xóa thành công!",
                color: "green",
                position: "top-right",
            });
        } catch (error) {
            console.error("Error deleting or fetching:", error);
            notifications.show({
                title: "Lỗi!",
                message: "Có lỗi xảy ra khi xóa Nhóm Thông Số!",
                color: "green",
                position: "top-right",
            });
        }
    };
    const listMaychu = maychu?.items?.result?.content?.map(
        (item: string | any, index: number) => (
            <Table.Tr
                key={index}
                bg={
                    selectedRowMayChu.includes(item.id)
                        ? "var(--mantine-color-blue-light)"
                        : undefined
                }
            >
                <Table.Td style={{ textAlign: "center" }}>
                    <Checkbox
                        aria-label="Select row"
                        checked={selectedRowMayChu.includes(item.id)}
                        onChange={(event) => {
                            if (event.currentTarget.checked) {
                                // Chọn một hàng (và bỏ chọn tất cả các hàng khác)
                                setSelectedRowsMayChu([item.id]);
                            } else {
                                // Bỏ chọn hàng
                                setSelectedRowsMayChu([]);
                            }
                        }}
                    />
                </Table.Td>

                <Table.Td style={{ textAlign: "center" }}>
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {item?.ten}
                    </Box>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                    {item?.moTa}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                    <ActionIcon
                        color="blue"
                        onClick={() => {
                            setEditDialogOpenMayChu(true);
                            setActiveUserMayChu({
                                id: item.id,
                                ten: item.ten,
                                moTa: item.moTa,
                            });
                        }}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconEdit size={20} />
                    </ActionIcon>

                    {" "}
                    <ActionIcon
                        color="red"
                        onClick={() => handlerDeleteMayChu(item?.id)}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconTrash size={20} />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        )
    );

    const listThongso = thongso?.items?.result?.content?.map(
        (item: string | any, index: number) => (
            <Table.Tr
                key={index}
                bg={
                    selectedRowThongso.includes(item.id)
                        ? "var(--mantine-color-blue-light)"
                        : undefined
                }
            >
                <Table.Td style={{ textAlign: "center" }}>
                    <Checkbox
                        aria-label="Select row"
                        checked={selectedRowThongso.includes(item.id)}
                        onChange={(event) => {
                            if (event.currentTarget.checked) {
                                // Chọn một hàng (và bỏ chọn tất cả các hàng khác)
                                setSelectedRowsThongSo([item.id]);
                            } else {
                                // Bỏ chọn hàng
                                setSelectedRowsThongSo([]);
                            }
                        }}
                    />
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>{item?.ma}</Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {item?.ten}
                    </Box>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                    {item?.moTa}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                    <ActionIcon
                        color="blue"
                        onClick={() => {
                            setEditDialogOpenThongSo(true);
                            setActiveUserThongSo({
                                id: item.id,
                                ma: item.ma,
                                ten: item.ten,
                                moTa: item.moTa,
                            });
                        }}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconEdit size={20} />
                    </ActionIcon>

                    {" "}
                    <ActionIcon
                        color="red"
                        onClick={() => handlerDeleteThongso(item?.id)}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconTrash size={20} />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        )
    );

    const listThongsoGrounp = thonsogoup?.items?.result?.content?.map(
        (item: string | any, index: number) => (
            <Table.Tr
                key={index}
                bg={
                    selectedRowNhomThongso.includes(item.id)
                        ? "var(--mantine-color-blue-light)"
                        : undefined
                }
            >
                <Table.Td style={{ textAlign: "center" }}>
                    <Checkbox
                        aria-label="Select row"
                        checked={selectedRowNhomThongso.includes(item.id)}
                        onChange={(event) => {
                            if (event.currentTarget.checked) {
                                // Chọn một hàng (và bỏ chọn tất cả các hàng khác)
                                setSelectedRowsNhomThongSo([item.id]);
                            } else {
                                // Bỏ chọn hàng
                                setSelectedRowsNhomThongSo([]);
                            }
                        }}
                    />
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>{item?.ma}</Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {item?.ten}
                    </Box>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                    {item?.moTa}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                    <ActionIcon
                        color="blue"
                        onClick={() => {
                            setEditDialogOpenNhomThongSo(true);
                            setActiveUserNhomThongSo({
                                id: item.id,
                                ma: item.ma,
                                ten: item.ten,
                                moTa: item.moTa,
                            });
                        }}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconEdit size={20} />
                    </ActionIcon>
                    {" "}
                    <ActionIcon
                        color="red"
                        onClick={() => handlerDeleteNhomThongSo(item?.id)}
                        style={{ margin: "0px 10px" }}
                    >
                        <IconTrash size={20} />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        )
    );
    return (
        <>
            <Add_EditMaychu_Dialog
                opened={editDialogOpenMayChu}
                onClose={() => setEditDialogOpenMayChu(false)}
                Data={activeUserMayChu}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Edit_Thongso_Dialog
                opened={editDialogOpenThongSo}
                onClose={() => setEditDialogOpenThongSo(false)}
                Data={activeUserThongSo}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Add_EditThongso_Dialog
                opened={editDialogOpenNhomThongSo}
                onClose={() => setEditDialogOpenNhomThongSo(false)}
                Data={activeUserNhomThongSo}
                activePage={activePage}
                searchValue={searchValue}
            />
            <Box style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <Group
                    mb="md"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Breadcrumbst ArrBreadcrumb={arr} />
                </Group>
                <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3">
                    <Input.Label size="17">Thêm phần mềm máy chủ</Input.Label>
                </Box>
                <Card
                    withBorder
                    shadow="md"
                    style={{ borderRadius: "12px", overflow: "hidden" }}
                >


                    <div className=" bg-[#eceef0] p-4 rounded mb-3 ">
                        <Box className="mb-2">
                            <Title order={3}>Máy chủ</Title>
                            <Table
                                striped
                                highlightOnHover
                                withTableBorder
                                withColumnBorders
                            >
                                <Table.Thead className="bg-[#339af0] text-white mt-3 ">
                                    <Table.Tr>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            #
                                        </Table.Th>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Máy chủ
                                        </Table.Th>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Mô tả
                                        </Table.Th>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Thao tác
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{listMaychu}</Table.Tbody>
                            </Table>
                            <Button
                                rightSection={<IconPlus size={16} />}
                                onClick={() => setDialogOpenedMayChu(true)}
                                className="mt-2"
                            >
                                Thêm máy chủ
                            </Button>
                        </Box>
                        <Box className="mb-2">
                            <Title order={3}>Thông số</Title>
                            <Table
                                striped
                                highlightOnHover
                                withTableBorder
                                withColumnBorders
                            >
                                <Table.Thead className="bg-[#339af0] text-white mt-3 ">
                                    <Table.Tr>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            #
                                        </Table.Th>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Mã
                                        </Table.Th>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Thông số
                                        </Table.Th>

                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Mô tả
                                        </Table.Th>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Thao tác
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{listThongso}</Table.Tbody>
                            </Table>
                            <Button
                                rightSection={<IconPlus size={16} />}
                                onClick={() => setDialogOpened(true)}
                                className="mt-2"
                            >
                                Thêm thông số
                            </Button>
                        </Box>
                        <Box className="mb-2">
                            <Title order={3}>Nhóm thông số</Title>
                            <Table
                                striped
                                highlightOnHover
                                withTableBorder
                                withColumnBorders
                            >
                                <Table.Thead className="bg-[#339af0] text-white mt-3 ">
                                    <Table.Tr>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            #
                                        </Table.Th>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Mã
                                        </Table.Th>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Nhóm Thông số
                                        </Table.Th>

                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Mô tả
                                        </Table.Th>
                                        <Table.Th
                                            style={{ textAlign: "center" }}
                                        >
                                            Thao tác
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{listThongsoGrounp}</Table.Tbody>
                            </Table>
                            <Button
                                rightSection={<IconPlus size={16} />}
                                onClick={() =>
                                    setDialogOpenedAddThongsoGround(true)
                                }
                                className="mt-2"
                            >
                                Thêm Nhóm thông số
                            </Button>
                        </Box>
                        <TextInput
                            label="Giá trị"
                            placeholder="Nhập giá trị phần mềm máy chủ"
                            key={form.key("value")}
                            {...form.getInputProps("value")}
                            withAsterisk
                            className="mr-4"
                        />
                    </div>
                    <Add_AddMaychu_Dialog
                        opened={dialogOpenedMayChu}
                        onClose={() => setDialogOpenedMayChu(false)}
                        activePage={activePage}
                        searchValue={searchValue}
                    />
                    <Add_AddThongso_Dialog
                        opened={dialogOpened}
                        onClose={() => setDialogOpened(false)}
                        activePage={1}
                        searchValue={"100"}
                    />
                    <Add_AddThongsoGround_Dialog
                        opened={dialogOpenedAddThongsoGround}
                        onClose={() => setDialogOpenedAddThongsoGround(false)}
                        activePage={1}
                        searchValue={"100"}
                    />
                    <Box className="mb-3 flex justify-end">
                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <Group justify="center" className="mt-6">
                                <Link href="/manage/softwaresever">
                                    <Button variant="filled" color="gray">
                                        Hủy bỏ
                                    </Button>
                                </Link>
                                <Button variant="filled" type="submit">
                                    Thêm phần mềm máy chủ
                                </Button>
                            </Group>
                        </form>
                    </Box>
                </Card>
            </Box>
        </>
    );
}
