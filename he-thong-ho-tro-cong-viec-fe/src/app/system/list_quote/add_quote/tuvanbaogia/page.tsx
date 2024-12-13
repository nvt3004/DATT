"use client";
import { fetchCustomer } from "@/store/slices/client/clientAction";
import { fetchPackage } from "@/store/slices/product/productAction";
import {
    ActionIcon,
    Box,
    Button,
    Checkbox,
    Group,
    Modal,
    MultiSelect,
    NumberInput,
    Select,
    Table,
    Text,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
    selectQuoteIdBaogia,
    selectQuoteIdBaoHanhBaoGia,
    selectQuoteIdSanpham,
    setIdSanPhamBaoGia,
} from "@/store/slices/quote/quoteSlice";

import { IconFileCheck, IconTrash } from "@tabler/icons-react";
import Add_Advise_Dialog from "./addDialong";
import { addSanPhamBaoGia, addTuVanBaoGia } from "@/store/slices/baohanhbaogia/baohanhbaogiaAction";
import { notifications } from "@mantine/notifications";
import Category_Function from "../categoryFunction/page";
import { deleteAdvise, fetchAdvise } from "@/store/slices/advise/adviseAction";
import { useRouter } from "next/navigation";
import { deleteQuote } from "@/store/slices/quote/quoteAction";

function TuVanBaoGia() {
    const router = useRouter();

    const { items, loading, error } = useSelector((state: any) => state.advise);
    const IdBaogia = useSelector(selectQuoteIdBaogia);
    const IdSanpham = useSelector(selectQuoteIdSanpham);
    const [selectedRowsTuVan, setSelectedRowsTuVan] = useState<number[]>([]);
    const IdbaoHanhBaoGia = useSelector(selectQuoteIdBaoHanhBaoGia);
    const [dialogOpened, setDialogOpened] = useState(false);
    const [continuequote3, setContinueQuote] = useState<boolean | undefined>(
        false
    );
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const form = useForm({
        validateInputOnBlur: true,
        mode: "uncontrolled",
    });
    const handleSubmit = async (values: typeof form.values | any) => {
        if (selectedRowsTuVan.length === 0) {
            notifications.show({
                title: "Lỗi",
                message: "Vui lòng điền đầy đủ thông tin!",
                color: "red",
                position: "top-right",
            });
            return;
        }
        const converDataTuVanBaogia = {
            baoHanhBaoGiaId: IdbaoHanhBaoGia,
            tuVanId: selectedRowsTuVan,
        };
        const dataSanPhamBaoGia = {
                baoGiaId: IdBaogia,
                sanPhamId: IdSanpham,
            };
        const res = await dispatch(addTuVanBaoGia(converDataTuVanBaogia));

        if (res.payload.code === 1000) {
            setContinueQuote(true);
            const resSanPhamBaoGia = await dispatch(
                addSanPhamBaoGia(dataSanPhamBaoGia)
            );
            dispatch(
                setIdSanPhamBaoGia(
                    resSanPhamBaoGia.payload.result.id
                )
            );
        } else {
            notifications.show({
                title: "Thêm thất bại",
                message: `${res.payload.response.data.message}`,
                color: "red",
                autoClose: 3000,
                position: "top-right",
            });
        }
    };
    useEffect(() => {
        const activePage = 1;
        const searchValue = "100";
        dispatch(fetchAdvise({ activePage, searchValue }));
    }, [dispatch]);
    const handlerDelete = async (id: string) => {
        try {
            await dispatch(deleteAdvise(id));
            const activePage = 1;
            const searchValue = "100";
            dispatch(fetchAdvise({ activePage, searchValue }));
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
                message: "Có lỗi xảy ra khi xóa Tư vấn!",
                color: "green",
                position: "top-right",
            });
        }
    };

    const rows = items?.content?.map((item: string | any, index: number) => (
        <Table.Tr
            key={index}
            bg={
                selectedRowsTuVan.includes(item.id)
                    ? "var(--mantine-color-blue-light)"
                    : undefined
            }
        >
            <Table.Td style={{ textAlign: "center" }}>
                <Checkbox
                    aria-label="Select row"
                    checked={selectedRowsTuVan.includes(item.id)}
                    onChange={(event) =>
                        setSelectedRowsTuVan(
                            event.currentTarget.checked
                                ? [...selectedRowsTuVan, item.id]
                                : selectedRowsTuVan.filter(
                                      (id) => id !== item.id
                                  )
                        )
                    }
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
                {" "}
                {item?.danhXung?.ten}
            </Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
                {" "}
                {item?.soDienThoai}
            </Table.Td>
            <Table.Td style={{ textAlign: "center" }}>{item?.email}</Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
                {" "}
                <ActionIcon
                    color="red"
                    onClick={() => handlerDelete(item?.id)}
                    style={{ margin: "0px 10px" }}
                >
                    <IconTrash size={20} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));
    const submitDeleteQuote = async () => {
        try {
            await dispatch(deleteQuote(IdBaogia));
            router.push("/system/list_quote");
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };
    return (
        <>
            <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3 ">
                <p>Tư vấn bảo hành </p>
            </Box>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead className="bg-[#339af0] text-white ">
                    <Table.Tr>
                        <Table.Th style={{ textAlign: "center" }}>#</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Tên</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>
                            Danh xưng
                        </Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>
                            Số Điện thoại
                        </Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>
                            Email
                        </Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>
                            Thao tác
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            {continuequote3 ? null : (
                <>
                    <Button
                        className="mt-2"
                        onClick={() => setDialogOpened(true)}
                        variant="filled"
                        type="submit"
                    >
                        Thêm Tư vấn
                    </Button>
                </>
            )}

            {continuequote3 ? (
                <Category_Function />
            ) : (
                <>
                    <Box className="mb-3 flex justify-end">
                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <Group justify="center" className="mt-6">
                                
                                <Button
                                    variant="filled"
                                    color="gray"
                                    onClick={submitDeleteQuote}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button variant="filled" type="submit">
                                    <IconFileCheck stroke={2} />
                                    Tiếp tục báo giá
                                </Button>
                            </Group>
                        </form>
                    </Box>
                </>
            )}
            <Add_Advise_Dialog
                opened={dialogOpened}
                onClose={() => setDialogOpened(false)}
            />
        </>
    );
}

export default TuVanBaoGia;
