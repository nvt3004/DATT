"use client";
import {
    Button,
    Card,
    Group,
    Table,
    Box,
    Pagination,
    Select,
    Text,
    Popover,
    Tooltip,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import { fetchQuoteDetail } from "@/store/slices/quote_detail/quoteDetailAction";
import { deleteQuote, fetchQuote } from "@/store/slices/quote/quoteAction";
import OpenCustomConfirmModal from "@/component/deleteConfirmModal/deleteConfirmModal";
import { IconListDetails, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

const arr = [
    { title: "Trang chủ", href: "/manage" },
    { title: "Quản lý", href: "/manage" },
    { title: "Báo giá", href: "/manage/quote" },
];
export default function PagePage() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const { items, loading, error } = useSelector((state: any) => state.quote);
    // handle pagination
    const [activePage, setPage] = useState<number | any>(1);

    // handle index
    const [rowpage, setRowpage] = useState<number | any>(5);
    // handle get value pagesize and pagesize
    const [searchValue, setSearchValue] = useState<string | undefined>("5");
    const [totalElements, setTotalElements] = useState<number | undefined>();
    useEffect(() => {
        if (items?.pageable?.pageSize) {
            setRowpage(items?.pageable?.pageSize);
            setTotalElements(items?.totalElements);
        }
    }, [items]);
    const startIndex = useMemo(() => {
        return rowpage ? (activePage - 1) * rowpage : 0;
    }, [activePage, rowpage]);

    const handlerDelete = async (id: string) => {
        try {
            await dispatch(deleteQuote(id));
            dispatch(fetchQuote({ activePage, searchValue }));
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };

    useEffect(() => {
        dispatch(fetchQuote({ activePage, searchValue }));
    }, [dispatch, activePage, searchValue]);

    const rows = items?.content?.map((item: string | any, index: number) => {
        return (
            <>
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
                    <Tooltip label={item?.tieuDe} position="top" withArrow multiline
                        style={{ maxWidth: 350, whiteSpace: 'normal' }}>
                        <Table.Td
                            className="p-3 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                            {item?.tieuDe}
                        </Table.Td>
                    </Tooltip>

                    <Table.Td style={{ padding: "10px" }}>
                        {item?.ngayTao}
                    </Table.Td>

                    <Table.Td style={{ padding: "10px" }}>
                        {item?.ngayHieuLuc}
                    </Table.Td>

                    <Table.Td
                        style={{
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px",
                            padding: "10px",
                        }}
                    >
                        <Group>
                            <Link href={`/manage/quote/${item?.id}`}>
                                <Button variant="subtle" color="blue">
                                    <IconListDetails size={20} />
                                </Button>
                            </Link>
                            <Button
                                variant="subtle"    
                                color="red"
                                onClick={() => {
                                    OpenCustomConfirmModal({
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
            </>
        );
    });

    return (
        <>
            <FullScreenLoader visible={loading} />
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
                                    <Table.Th>Báo giá</Table.Th>
                                    <Table.Th>Ngày báo giá </Table.Th>
                                    <Table.Th>Ngày hiệu lực</Table.Th>
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
                            total={items?.totalPages}
                        />
                    </Group>
                </Card>
            </Box>
        </>
    );
}
