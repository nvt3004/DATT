"use client";
import {
    Button,
    Card,
    Group,
    Table,
    Box,
    Pagination,
    Select,
    Tooltip,
} from "@mantine/core";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";

import openCustomConfirmModal from "@/component/deleteConfirmModal/deleteConfirmModal";

import { useRouter } from "next/navigation";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import {
    deleteproductCategorys,
    fetchproductCategorys,
} from "@/store/slices/productcategorys/productcategorysAction";
import { formatPrice } from "@/component/Format/FormatProce";

const arr = [
    { title: "Trang chủ", href: "/manage" },
    { title: "Quản lý", href: "/manage" },
    { title: "Sản phẩm hạng mục", href: "" },
];
function Productcategorys() {
    const router = useRouter();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [loadingnvg, setLoadingnvg] = useState(false);

    const { items, loading, error } = useSelector(
        (state: any) => state.productcategorys
    );
    // handle pagination
    const [activePage, setPage] = useState<number | any>(1);

    // handle index tăng dần
    const [rowpage, setRowpage] = useState<number | any>(5);
    // handle get value pagesize and pagesize
    const [searchValue, setSearchValue] = useState<string | undefined>("5");
    const [totalElements, setTotalElements] = useState<number | undefined>();
    useEffect(() => {
        if (items?.result?.content) {
            setRowpage(items?.result?.pageable?.pageSize);
            setTotalElements(items?.result?.totalElements);
        }
    }, [items]);

    const startIndex = useMemo(() => {
        return rowpage ? (activePage - 1) * rowpage : 0;
    }, [activePage, rowpage]);

    const handlerDelete = async (id: string) => {
        try {
            await dispatch(deleteproductCategorys(id));
            dispatch(fetchproductCategorys({ activePage, searchValue }));
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };

    useEffect(() => {
        dispatch(fetchproductCategorys({ activePage, searchValue }));
    }, [dispatch, activePage, searchValue]);

    const handleNavigate_Add = () => {
        setLoadingnvg(true);
        router.push(`/manage/productcategorys/addproductcategorys`);
    };
    const handleNavigate_Edit = (id: any) => {
        setLoadingnvg(true);
        router.push(`/manage/productcategorys/${id}`);
    };
    const rows = items?.result?.content?.map(
        (item: string | any, index: number) => (
            <Table.Tr
                key={item.id}
                style={{
                    transition: "background-color 0.2s ease",
                    fontSize: "16px",
                    height: "60px",
                    borderCollapse: "separate",
                    marginBottom: "10px",
                }}
            >
                <Table.Td
                    style={{
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                        padding: "10px",
                    }}
                >
                    {startIndex + index + 1}
                </Table.Td>

                <Table.Td style={{ padding: "10px",  maxWidth: 200 }}>
                    {" "}
                    <Tooltip
                        label={item?.sanPham?.ten}
                        position="top"
                        withArrow
                        multiline
                        style={{ maxWidth: 200, whiteSpace: "normal" }}
                    >
                        <Table.Td className="p-3 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {item?.sanPham?.ten}
                        </Table.Td>
                    </Tooltip>
                </Table.Td>
                <Table.Td style={{ padding: "10px" ,  maxWidth: 200}}>
                    {" "}
                    <Tooltip
                        label={item?.hangMuc?.ten}
                        position="top"
                        withArrow
                        multiline
                        style={{ maxWidth: 200, whiteSpace: "normal" }}
                    >
                        <Table.Td className="p-3 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {item?.hangMuc?.ten}
                        </Table.Td>
                    </Tooltip>
                </Table.Td>

                <Table.Td style={{ padding: "10px" }}>
                    {" "}
                    {formatPrice(item?.hangMuc?.gia)}
                </Table.Td>
                <Table.Td style={{ padding: "10px" }}>
                    {" "}
                    {item?.hangMuc?.soLuong}
                </Table.Td>
                <Table.Td style={{ padding: "10px" }}>
                    {" "}
                    {item?.hangMuc?.donViTinh?.ten}
                </Table.Td>
                <Table.Td
                    style={{
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        padding: "10px",
                    }}
                >
                    <Group
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="subtle"
                            color="blue"
                            onClick={() => {
                                handleNavigate_Edit(item.id);
                            }}
                        >
                            <IconEdit size={20} />
                        </Button>

                        <Button
                            variant="subtle"
                            color="red"
                            onClick={() => {
                                openCustomConfirmModal({
                                    id: item.id,
                                    onConfirmAction: async (id: string) => {
                                        await handlerDelete(id);
                                    },
                                });
                            }}
                        >
                            <IconTrash size={20} />
                        </Button>
                    </Group>
                </Table.Td>
            </Table.Tr>
        )
    );

    return (
        <>
            <FullScreenLoader visible={loadingnvg} />
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

                    <Box style={{ flexGrow: 1, textAlign: "right" }}>
                        <Button
                            rightSection={<IconPlus size={16} />}
                            onClick={() => handleNavigate_Add()}
                        >
                            Thêm
                        </Button>
                    </Box>
                </Group>

                <Card
                    withBorder
                    shadow="md"
                    style={{ borderRadius: "12px", overflow: "hidden" }}
                >
                    <Table.ScrollContainer minWidth={500}>
                        <Table
                            highlightOnHover
                            verticalSpacing="md"
                            horizontalSpacing="lg"
                            striped
                            style={{
                                borderCollapse: "separate",
                                borderSpacing: "0 10px",
                                fontSize: "16px",
                            }}
                        >
                            <Table.Thead
                                style={{
                                    backgroundColor: "#228be6",
                                    color: "white",
                                    textAlign: "left",
                                    fontSize: "18px",
                                    height: "50px",
                                }}
                            >
                                <Table.Tr>
                                    <Table.Th
                                        style={{
                                            padding: "12px",
                                            borderRadius: "12px 0 0 12px",
                                        }}
                                    >
                                        STT
                                    </Table.Th>
                                    <Table.Th>Sản phẩm</Table.Th>
                                    <Table.Th>Hạng mục</Table.Th>
                                    <Table.Th>Giá</Table.Th>
                                    <Table.Th>Số lượng</Table.Th>
                                    <Table.Th>Đơn vị tính</Table.Th>
                                    <Table.Th
                                        style={{
                                            borderRadius: "0 12px 12px 0",
                                        }}
                                    >
                                        Hành động
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody
                                style={{
                                    backgroundColor: "white",
                                    boxShadow:
                                        "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "12px",
                                }}
                            >
                                {rows} {error && error}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                    <Group
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px",
                        }}
                    >
                        <Box className="flex items-center">
                            Hiển thị{" "}
                            <Select
                                value={rowpage.toString()}
                                data={["5", "10", "15", "20"]}
                                onChange={(value) => {
                                    const newPageSize: string | any = value;
                                    setSearchValue(newPageSize);

                                    if (
                                        totalElements &&
                                        (activePage - 1) * newPageSize >=
                                            totalElements
                                    ) {
                                        setPage(1);
                                    }
                                }}
                                className="w-[20%] mx-2"
                            />
                            Trên tổng số {totalElements}
                        </Box>
                        <Pagination
                            value={activePage}
                            onChange={setPage}
                            total={items?.result?.totalPages}
                        />
                    </Group>
                </Card>
            </Box>
        </>
    );
}

export default Productcategorys;
