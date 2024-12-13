"use client";
import { useParams, useRouter } from "next/navigation";
import { GetoneReport, deleteReport_conten, deleteReport_ingredient, deleteReport_conclude, updateReport_conten } from "@/store/slices/report/repostAction";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Title, Table, Alert, Accordion, Button, Tooltip, Flex, Popover, Text, Textarea, Group } from "@mantine/core";
import {
  IconTrashX,
  IconPlus,
  IconEdit,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

import ModalAddUser from "./modal/add_user";
import ModalAddUser_outside from "./modal/add_user_outside";
import ModalAddConten from "./modal/add_conten";
import EditUser from "./modal/edit_user";
import ModalAddConclusion from "./modal/add_conclusion";


import openCustomConfirmModal from "@/component/deleteConfirmModal/deleteConfirmModal";
import EditConclusion from "./modal/edit_conclusion";
import { IconFileDownload, IconArrowNarrowLeft, IconCheck, IconX } from "@tabler/icons-react";
import { PATHS } from './../../../../../store/configPath';



const ReportDetail = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [openedConten, setOpenedConten] = useState(false);
  const [openedConclusion, setOpenedConclusion] = useState(false);
  const [opened_outside, setOpened_outside] = useState(false);

  const [currentThanhPhanTen, setCurrentThanhPhanTen] = useState<string | null>(null);
  const [currentThanhPhanId, setCurrentThanhPhanId] = useState<number | null>(null);

  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editData, setEditData] = useState(null);

  const [editModal_conclusionOpened, setEditModal_conclusionOpened] = useState(false);
  const [editData_conclusion, setEditData_conclusion] = useState(null);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const [loadingnvg, setLoadingnvg] = useState(false);


  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { items, loading, error } = useSelector((state: any) => state.report);
  const { id } = useParams();
  const reportId = Number(id);

  const [reportid, setReportId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(GetoneReport({ id: reportId }));
  }, [dispatch]);

  const handleUpdateIngredientList = () => {
    dispatch(GetoneReport({ id: reportId }));
  };


  const modalOpened = () => {
    setOpened(true);
  };

  const modalOpened_outside = () => {
    setOpened_outside(true);
  };

  const modalOpenedConten = (tenNguoiPhatBieu: string, id: number) => {
    setCurrentThanhPhanTen(tenNguoiPhatBieu);
    setCurrentThanhPhanId(id);
    setOpenedConten(true);
  };

  const modalOpenedConclusion = (id: number) => {
    setOpenedConclusion(true);
    setReportId(id);
  };

  const modalClose = () => {
    setOpened(false);
  };

  const modalClose_outsize = () => {
    setOpened_outside(false)
  }

  const modalCloseConten = () => {
    setOpenedConten(false);
  }

  const modalCloseConclusion = () => {
    setOpenedConclusion(false);
  }

  const handleDelete_Conten = async (id: string) => {
    try {
      await dispatch(deleteReport_conten(id));
      dispatch(GetoneReport({ id: reportId }));
    } catch (error) {
      console.error("Error deleting or fetching:", error);
    }
  };

  const handlerDelete_Conclude = async (id: string) => {
    try {
      await dispatch(deleteReport_conclude(id));
      dispatch(GetoneReport({ id: reportId }));
    } catch (error) {
      console.error("Error deleting or fetching:", error);
    }
  };

  const handleDeleteReport = async (deleteReportId: string) => {
    try {
      await dispatch(deleteReport_ingredient(deleteReportId))
      dispatch(GetoneReport({ id: reportId }));
    } catch (error) {
      console.error("Error deleting or fetching:", error);
    }
  };

  const handleEdit = (item: any) => {
    setEditData(item);
    setEditModalOpened(true);
  };

  const handleEdit_conclusion = (item: any) => {
    setEditData_conclusion(item);
    setEditModal_conclusionOpened(true);
  };


  const handleEditContent = (noiDung: any, index: number) => {
    setEditIndex(index); // Đánh dấu item này đang chỉnh sửa
    setEditContent(noiDung.mota || ''); // Lưu nội dung của item vào state để có thể chỉnh sửa
  };

  const handleSaveEdit = async (id: number, bienBanThanhPhanId: number) => {
    if (editContent || editData != '') {
      const formatdata = {
        mota: editContent,
        bienBanThanhPhanId: bienBanThanhPhanId
      }
      try {
        await dispatch(updateReport_conten({ id: id, data: formatdata })).unwrap();
        handleUpdateIngredientList()
        notifications.show({
          title: "Thành công",
          message: "Dữ liệu đã được cập nhật thành công!",
          color: "green",
          position: "top-right",
        });
      } catch (error) {
        notifications.show({
          title: "Thất bại",
          message: "Cập nhật dữ liệu thất bại. Vui lòng thử lại!",
          color: "red",
          position: "top-right",
        });
        console.log(error);
      }
    } else {
      notifications.show({
        title: "Thất bại",
        message: "Vui lòng nhập nội dung phát biểu!",
        color: "red",
        position: "top-right",
      });
    }

    setEditIndex(null); // Đặt lại trạng thái không chỉnh sửa
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    notifications.show({
      title: "Đã hủy",
      message: "Đã hủy thao tác chỉnh sửa nội dung phát biểu!",
      color: "red",
      position: "top-right",
    });
  }

  const handleBack = () => {
    setLoadingnvg(true);
    router.push(`/system/report`);
  }


  return (
    <>
      <FullScreenLoader visible={loading} />
      <FullScreenLoader visible={loadingnvg} />

      <Box p="lg">
        {/* Tiêu đề */}
        <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-4">
          <Flex justify="space-between" align="center">
            <Title order={3}>Chi tiết biên bản</Title>
          </Flex>
        </Box>

        {/* Tên biên bản */}
        <Alert variant="light" color="blue" title="Tên biên bản">
          <Flex justify="space-between" align="center">
            <span>
              {items?.result?.ten}
            </span>
          </Flex>
        </Alert>

        {/* Ngày tạo */}
        <Box className="my-4">
          <Alert variant="light" color="blue" title="Ngày tạo">
            <Flex justify="space-between" align="center">
              <span>
                {items?.result?.ngayTao}
              </span>
            </Flex>
          </Alert>
        </Box>

        {/* Thông tin địa điểm và thời gian */}
        <Box className="my-4">
          <Alert variant="light" color="blue" title="Địa điểm và thời gian">
            <Flex justify="space-between" align="center">
              <span>
                <strong>Địa điểm:</strong> {items?.result?.diadiem} <br />
                <strong>Giờ bắt đầu:</strong> {items?.result?.giobatdau} <br />
                <strong>Giờ kết thúc:</strong> {items?.result?.gioketthuc}
              </span>
            </Flex>
          </Alert>
        </Box>

        {/* Mô tả biên bản */}
        <Box className="my-4">
          <Alert variant="light" color="blue" title="Mô tả">
            <Flex justify="space-between" align="center">
              <span>{items?.result?.mota}</span>
            </Flex>
          </Alert>
        </Box>

        {/* Người dùng thông tin */}
        <Box className="my-4">
          <Alert variant="light" color="blue" title="Người tạo">
            <Flex justify="space-between" align="center">
              <span>
                <strong>Tên:</strong> {items?.result?.nguoiDung?.ten} <br />
                <strong>Email:</strong> {items?.result?.nguoiDung?.email}
              </span>
            </Flex>
          </Alert>
        </Box>


        {/* Thành phần tham dự */}
        <Accordion defaultValue="bienBanThanhPhan" className="my-2">
          <Accordion.Item value="bienBanThanhPhan">
            <Accordion.Control
              style={{
                backgroundColor: "#ebf8ff",
                color: "#1c7ed6",
                fontWeight: "600",
                padding: "5px",
                borderRadius: "0.375rem",
                border: "1px solid #339af0",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d0ebff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebf8ff")}
            >
              Biên bản thành phần
            </Accordion.Control>
            <Accordion.Panel className="border-blue-500 p-4 bg-blue-50 rounded-lg shadow-sm">
              <Table striped className="table-auto">
                <Table.Thead className="bg-blue-100 text-blue-800">
                  <Table.Tr>
                    <Table.Th className="p-3 border border-blue-300">Tên</Table.Th>
                    <Table.Th className="p-3 border border-blue-300">Đơn vị</Table.Th>
                    <Table.Th className="p-3 border border-blue-300">Email</Table.Th>
                    <Table.Th className="p-3 border border-blue-300">Thao tác</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {items?.result?.listBienBanThanhPhan?.map((item: any) => (
                    <>
                      <Table.Tr key={item.id} className="hover:bg-blue-50">
                        <Table.Td className="p-3 border border-blue-300">
                          <Popover width={200} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                              <div
                                style={{
                                  maxWidth: "230px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  cursor: "pointer",
                                }}
                              >
                                {item.ten}
                              </div>
                            </Popover.Target>
                            <Popover.Dropdown>
                              <Text>{item.ten}</Text>
                            </Popover.Dropdown>
                          </Popover>
                        </Table.Td>
                        <Table.Td className="p-3 border border-blue-300">
                          <Popover width={200} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                              <div
                                style={{
                                  maxWidth: "200px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  cursor: "pointer",
                                }}
                              >
                                {item.donvi}
                              </div>
                            </Popover.Target>
                            <Popover.Dropdown>
                              <Text>{item.donvi}</Text>
                            </Popover.Dropdown>
                          </Popover>
                        </Table.Td>
                        <Table.Td className="p-3 border border-blue-300">
                          <Popover width={200} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                              <div
                                style={{
                                  maxWidth: "100px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  cursor: "pointer",
                                }}
                              >
                                {item.email}
                              </div>
                            </Popover.Target>
                            <Popover.Dropdown>
                              <Text>{item.email}</Text>
                            </Popover.Dropdown>
                          </Popover>
                        </Table.Td>
                        <Table.Td className="border border-blue-300" style={{ maxWidth: "150px", padding: "8px" }}>
                          <Flex align="center" gap="sm" style={{ width: "100%", justifyContent: "space-between" }}>
                            <Tooltip label="Chỉnh sửa" position="top" withArrow>
                              <Button variant="subtle" color="blue" onClick={() => handleEdit(item)}>
                                <IconEdit size={20} />
                              </Button>
                            </Tooltip>

                            <Tooltip label="Thêm nội dung phát biểu" position="top" withArrow>
                              <Button variant="subtle" color="blue" onClick={() => modalOpenedConten(item.ten, item.id)}>
                                <IconPlus size={20} />
                              </Button>
                            </Tooltip>

                            <Tooltip label="Xóa người tham dự" position="top" withArrow>
                              <Button
                                variant="subtle"
                                color="red"
                                onClick={() => {
                                  openCustomConfirmModal({
                                    id: item.id,
                                    onConfirmAction: async (id: string) => {
                                      await handleDeleteReport(id);
                                    },
                                  });
                                }}
                              >
                                <IconTrashX size={20} />
                              </Button>
                            </Tooltip>
                          </Flex>
                        </Table.Td>

                      </Table.Tr>
                      {/* Hiển thị nội dung phát biểu bên dưới mỗi hàng */}
                      {/* ĐANG CODE Ở ĐÂY */}
                      <Table.Td colSpan={4} className="p-3 border border-blue-300">
                        <Text>Phát biểu:</Text>
                        {item.listBienBanNoiDung?.map((noiDung: any, index: number) => (
                          <Flex key={index} align="center" justify="space-between">
                            {/* Phần nội dung Popover */}
                            <Popover width={"750px"} position="bottom" withArrow shadow="md">
                              <Popover.Target>
                                <div
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    cursor: "pointer",
                                    maxWidth: "800px",
                                  }}
                                >
                                  {editIndex === noiDung?.id ? (
                                    <>
                                      <Textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        placeholder="Nhập phát biểu"
                                        autosize
                                        minRows={6}
                                        maxRows={10}
                                        resize="vertical"
                                        style={{
                                          width: "800px",
                                          marginRight: "80px", // Chừa không gian cho các nút
                                        }}
                                      />
                                    </>
                                  ) : (
                                    noiDung.mota ? `- ${noiDung.mota}` : "No data"
                                  )}
                                </div>
                              </Popover.Target>
                              <Popover.Dropdown>
                                <Text>{noiDung.mota}</Text>
                              </Popover.Dropdown>
                            </Popover>

                            {/* Phần nút hành động */}
                            {editIndex === noiDung?.id ? (
                              <Group justify="center">
                                {/* Nút Tích */}
                                <Button
                                  color="green"
                                  size="xs"
                                  onClick={() => handleSaveEdit(noiDung.id, item.id)}
                                >
                                  <IconCheck size={20} />
                                </Button>
                                {/* Nút X */}
                                <Button
                                  color="red"
                                  size="xs"
                                  onClick={() => handleCancelEdit()}
                                >
                                  <IconX size={20} />
                                </Button>
                              </Group>
                            ) : (
                              <Flex gap="xs">
                                {/* Nút Chỉnh sửa */}
                                <Tooltip label="Chỉnh sửa phát biểu" position="top" withArrow>
                                  <Button
                                    variant="subtle"
                                    color="blue"
                                    onClick={() => handleEditContent(noiDung, noiDung?.id)}
                                  >
                                    <IconEdit size={20} />
                                  </Button>
                                </Tooltip>
                                {/* Nút Xóa */}
                                <Tooltip label="Xóa phát biểu" position="top" withArrow>
                                  <Button
                                    variant="subtle"
                                    color="red"
                                    onClick={() => {
                                      openCustomConfirmModal({
                                        id: noiDung.id,
                                        onConfirmAction: async (id: string) => {
                                          await handleDelete_Conten(id);
                                        },
                                      });
                                    }}
                                  >
                                    <IconTrashX size={20} />
                                  </Button>
                                </Tooltip>
                              </Flex>
                            )}
                          </Flex>
                        ))}

                      </Table.Td>

                    </>
                  ))}
                </Table.Tbody>
              </Table>
              <Box style={{ display: "flex", justifyContent: "flex-end", margin: "20px 0px" }}>
                <Button onClick={modalOpened} leftSection={<IconPlus size={20} />} style={{ margin: "0 15px" }}>
                  Thêm người tham dự</Button>

                <Button onClick={modalOpened_outside} leftSection={<IconPlus size={20} />}>
                  Thêm người tham dự bên ngoài</Button>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        {/* Biên bản kết luận */}
        <Accordion defaultValue="bienBanKetLuan" className="my-4">
          <Accordion.Item value="bienBanKetLuan">
            <Accordion.Control
              style={{
                backgroundColor: "#ebf8ff",
                color: "#1c7ed6",
                fontWeight: "600",
                padding: "5px",
                borderRadius: "0.375rem",
                border: "1px solid #339af0",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d0ebff")} // Hover màu bg-blue-200
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ebf8ff")} // Trả về màu ban đầu
            >
              Biên bản kết luận
            </Accordion.Control>
            <Accordion.Panel className=" border-blue-500 p-4 bg-blue-50 rounded-lg shadow-sm">
              <Table striped className="w-full border-collapse border border-blue-300 rounded-lg">
                <Table.Thead className="bg-blue-100 text-blue-800">
                  <Table.Tr>
                    <Table.Th className="p-3 border border-blue-300">Nội dung</Table.Th>
                    <Table.Th className="p-3 border border-blue-300">Thao tác</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {items?.result?.listBienBanKetLuan?.map((item: any) => (
                    <Table.Tr key={item.id} className="hover:bg-blue-50">

                      <Tooltip label={item.mota} position="top" withArrow multiline
                        style={{ maxWidth: 300, whiteSpace: 'normal' }}>
                        <Table.Td
                          className="p-3 border border-blue-300 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {item.mota}
                        </Table.Td>
                      </Tooltip>

                      <Table.Td className="p-3 border border-blue-300">

                        <Tooltip label="Chỉnh sửa" position="top" withArrow>
                          {/* ĐANG CODE Ở ĐÂY */}
                          <Button variant="subtle" color="blue" ml="xs" onClick={() => handleEdit_conclusion(item)}>
                            <IconEdit size={20} />
                          </Button>
                        </Tooltip>

                        <Tooltip label="Xóa" position="top" withArrow>
                          <Button variant="subtle" color="red" ml="xs"
                            onClick={() => {
                              openCustomConfirmModal({
                                id: item.id,
                                onConfirmAction: async (id: string) => {
                                  await handlerDelete_Conclude(id);
                                },
                              });
                            }}
                          >
                            <IconTrashX size={20} />
                          </Button>
                        </Tooltip>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
              <Box style={{ display: "flex", justifyContent: "flex-end", margin: '20px 0px' }}>
                <Button leftSection={<IconPlus size={20} />} onClick={() => modalOpenedConclusion(reportId)}>
                  Thêm kết luận</Button>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Box className="my-4">
          <Alert variant="light" color="blue" title="Tải file">
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "15px",
              }}
            >
              <Button leftSection={<IconArrowNarrowLeft size={20} />} onClick={() => handleBack()}>Trở lại</Button>

              <Button
                leftSection={<IconFileDownload size={20} />}
                onClick={() => {
                  window.location.href = `${PATHS.Report_Download}/bienbanhop?bienBanHopId=${id}`;
                }}
              >
                Tải file
              </Button>
            </Box>
          </Alert>
        </Box>


        <ModalAddUser
          opened={opened}
          onClose={modalClose}
          reportId={reportId}
          updateImtergay={handleUpdateIngredientList}
        />

        <ModalAddUser_outside
          opened={opened_outside}
          onClose={modalClose_outsize}
          reportId={reportId}
          updateImtergay={handleUpdateIngredientList}
        />
        <ModalAddConten
          opened={openedConten}
          onClose={modalCloseConten}
          id={currentThanhPhanId}
          reporTen={currentThanhPhanTen}
          updateImtergay={handleUpdateIngredientList}
        />

        <ModalAddConclusion
          opened={openedConclusion}
          onClose={modalCloseConclusion}
          id={reportid}
          updateImtergay={handleUpdateIngredientList}
        />

        {editData && (
          <EditUser
            opened={editModalOpened}
            onClose={() => setEditModalOpened(false)}
            title="thông tin người tham dự"
            data={editData}
            reportId={reportId}
            handleUpdateIngredientList={handleUpdateIngredientList}
          />
        )}


        {editData_conclusion && (
          <EditConclusion
            opened={editModal_conclusionOpened}
            onClose={() => setEditModal_conclusionOpened(false)}
            title="kết luận biên bản"
            data={editData_conclusion}
            reportId={reportId}
            handleUpdateIngredientList={handleUpdateIngredientList}
          />
        )}
      </Box>
    </>
  );
};

export default ReportDetail;