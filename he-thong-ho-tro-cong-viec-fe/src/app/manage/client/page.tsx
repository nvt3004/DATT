"use client";
import {
    Button,
    Card,
    Group,
    Table,
    Box,
    Pagination,
    Select,
} from "@mantine/core";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import Add_Customer_Dialog from "./addDialong";
import Edit_Customer_Dialog from "./editDialong";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import openCustomConfirmModal from "@/component/deleteConfirmModal/deleteConfirmModal";
import { deleteCustomer, fetchCustomer } from "@/store/slices/client/clientAction";

interface CustomerValue {
    id: string | number;
    ten: string;
    moTa: string;
    danhXung: string | number;
}

const arr = [
    { title: "Trang chủ", href: "/manage" },
    { title: "Quản lý", href: "/manage" },
    { title: "Khách hàng", href: "/manage/client" },
];

export default function CustomerPage() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { items, loading, error } = useSelector((state: any) => state.customer);

    // handle pagination
    const [activePage, setPage] = useState<number | any>(1);

    // handle open close dialog
    const [dialogOpened, setDialogOpened] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    
    // handle active
    const [activeValue, setActiveValue] = useState<CustomerValue | any>(undefined);
    
    // handle index tăng dần
    const [rowpage, setRowpage] = useState<number | any>(5);
    
    // handle get value pagesize and pagesize
    const [searchValue, setSearchValue] = useState<string | undefined>("5");
    const [totalElements, setTotalElements] = useState<number | undefined>();

    useEffect(() => {
        if (items?.content) {
            setRowpage(items?.pageable?.pageSize);
            setTotalElements(items?.totalElements);
        }
    }, [items]);

    const startIndex = useMemo(() => {
        return rowpage ? (activePage - 1) * rowpage : 0;
    }, [activePage, rowpage]);

    const handlerDelete = async (id: string) => {
        try {
            await dispatch(deleteCustomer(id));
            dispatch(fetchCustomer({ activePage, searchValue }));
        } catch (error) {
            console.error("Error deleting or fetching:", error);
        }
    };

    useEffect(() => {
        dispatch(fetchCustomer({ activePage, searchValue }));
    }, [dispatch, activePage, searchValue]);

    const rows = items?.content?.map((item: any, index: number) => (
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
            <Table.Td style={{ padding: "0px" }}>
                {item?.danhXung?.ten}
            </Table.Td>
            <Table.Td style={{ padding: "10px" }}>{item?.ten}</Table.Td>
            <Table.Td
                style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                    padding: "10px",
                }}
            >
                <Group>
                    <Button
                        variant="subtle"
                        color="blue"
                        onClick={() => {
                            setEditDialogOpen(true);
                            setActiveValue({
                                id: item.id,
                                ten: item?.ten,
                                moTa: item?.moTa,
                                danhXung: item?.danhXung?.id,
                            });
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
    ));

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

                    <Box style={{ flexGrow: 1, textAlign: "right" }}>
                        <Button
                            rightSection={<IconPlus size={16} />}
                            style={{
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                            }
                            onClick={() => setDialogOpened(true)}
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
                                    <Table.Th>Danh xưng</Table.Th>
                                    <Table.Th>Họ và tên</Table.Th>
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
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
                        <Box style={{ display: "flex", alignItems: "center" }}>
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

                <Add_Customer_Dialog
                    opened={dialogOpened}
                    onClose={() => setDialogOpened(false)}
                    activePage={activePage}
                    searchValue={searchValue}
                />

                <Edit_Customer_Dialog
                    opened={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    Data={activeValue}
                    activePage={activePage}
                    searchValue={searchValue}
                />
            </Box>
        </>
    );
}