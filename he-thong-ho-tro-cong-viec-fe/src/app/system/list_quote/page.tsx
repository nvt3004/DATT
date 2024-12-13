"use client";
import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import { Box, Text, Title } from "@mantine/core";
import { Button, Group } from "@mantine/core";
import { Select } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { Table } from "@mantine/core";
import { IconAlignBoxLeftMiddle, IconPlus } from "@tabler/icons-react";
import { IconFileTypeDoc } from "@tabler/icons-react";
import { Pagination } from "@mantine/core";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchQuote } from "@/store/slices/quote/quoteAction";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import { useRouter } from "next/navigation";

const arr = [
    { title: "Trang chủ", href: "/system" },
    { title: "Danh Sách báo giá", href: "/system/list_quote" },
];

export default function DanhSachBaoGia() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const { items, loading, error } = useSelector((state: any) => state.quote);
    // handle pagination
    const [activePage, setPage] = useState<number | any>(1);
    // handle index tăng dần
    const [rowpage, setRowpage] = useState<number | any>(5);
    // handle get value pagesize and pagesize
    const [searchValue, setSearchValue] = useState<string | undefined>("5");
    const [totalElements, setTotalElements] = useState<number | undefined>();
    const [loadingnvg, setLoadingnvg] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (items?.content) {
            setRowpage(items?.pageable?.pageSize);
            setTotalElements(items?.totalElements);
        }
    }, [items]);

    const startIndex = useMemo(() => {
        return rowpage ? (activePage - 1) * rowpage : 0;
    }, [activePage, rowpage]);
    useEffect(() => {
        dispatch(fetchQuote({ activePage, searchValue }));
    }, [dispatch, activePage, searchValue]);

    const handleNavigate_Deltel = (id: any) => {
        setLoadingnvg(true);
        router.push(`/system/list_quote/${id}`);
    }


    const rows = items?.content?.map((item: string | any, index: number) => (
        <Table.Tr key={index}>
            <Table.Td style={{ textAlign: "center" }}>
                {" "}
                {startIndex + index + 1}
            </Table.Td>

            <Table.Td style={{ textAlign: "center" }}>
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ marginRight: "10px" }}>{item?.tieuDe}</Text>
                    <Box
                        style={{
                            padding: "3px 7px",
                            borderRadius: "20px",
                            border: `2px solid ${item?.goiBaoGia?.id === 2 ? "#ff5733" : "#4CAF50"}`,
                            color: `${item?.goiBaoGia?.id === 2 ? "#ff5733" : "#4CAF50"}`,
                            fontWeight: "bold",
                            fontSize: "12px",
                            display: "inline-block",
                        }}
                    >
                        {item?.goiBaoGia?.ten}
                    </Box>
                </Box>
            </Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
                {" "}
                {item?.ngayTao}
            </Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
                {item?.ngayHieuLuc}
            </Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
                <Button onClick={() => handleNavigate_Deltel(item.id)}>
                    <IconAlignBoxLeftMiddle size={20} />
                </Button>
            </Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
                <Button onClick={() => {
                    window.location.href = `http://172.16.1.98:8003/api/cusc-quote/v1/word/bangbaogia?baoGiaId=${item?.id}`;
                }}>
                    <IconFileTypeDoc size={20} />
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <FullScreenLoader visible={loading} />
            <FullScreenLoader visible={loadingnvg} />
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
            <div className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3 ">
                <Title order={3}>Danh sách báo giá</Title>
            </div>
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link className="mb-2" href="/system/list_quote/add_quote">
                    <Button
                        leftSection ={<IconPlus size={16} />}
                        style={{
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.transform =
                            "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        Thêm báo giá
                    </Button>
                </Link>
            </Box>

            <div className="mb-5">
                <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                >
                    <Table.Thead className="bg-[#339af0] text-white ">
                        <Table.Tr>
                            <Table.Th style={{ textAlign: "center" }}>
                                STT
                            </Table.Th>

                            <Table.Th style={{ textAlign: "center" }}>
                                Báo giá
                            </Table.Th>
                            <Table.Th style={{ textAlign: "center" }}>
                                Ngày báo giá
                            </Table.Th>
                            <Table.Th style={{ textAlign: "center" }}>
                                Ngày hiệu lực
                            </Table.Th>
                            <Table.Th style={{ textAlign: "center" }}>
                                Chi tiết
                            </Table.Th>
                            <Table.Th style={{ textAlign: "center" }}>
                                Xuất
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows?.length > 0 ? rows : 'không có dữ liệu'}
                        {error}
                    </Table.Tbody>
                </Table>
            </div>

            <div>
                <Group
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                    }}
                    className="shadow-sm"
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
            </div>
        </>
    );
}
