"use client";

import { Text, Title, Button, Modal, Box, Image } from "@mantine/core";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { ActionIcon } from '@mantine/core';

const elements = [
  {
    price: "10.000.000đ",
    content: "Cài đặt, tập huấn và hướng dẫn sử dụng phần mềm.",
    type: "Phần hệ",
    viewDate: "22/09/2024",
    quoteDate: "22/09/2024",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu1zbd4DOsZXlHbeu_mEbBMnXhyRZb0VFY5qG0Wp_z6zpGAEHi2_9WsIRAJgCls5_pbNw&usqp=CAU",
    details: {
      name: "NguyenVana",
      email: "nguyenvana@gmail.com",
      phone: "+84 112 456 7890",
      code: "id1293u23",
      message:
        "Chào! Tôi đã thấy thông tin về phần mềm của bạn và tôi muốn mua. Tôi rất mong muốn thảo luận về khả năng mua phần mềm này và sẽ rất cảm kích nếu bạn có thể hỗ trợ tôi trong vấn đề này.",
    },
  },
  {
    price: "5.000.000đ",
    content: "Nâng cấp bổ sung phần hệ quản lý quy trình của hàng trực tuyến.",
    type: "Gói",
    viewDate: "21/09/2024",
    quoteDate: "22/09/2024",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu1zbd4DOsZXlHbeu_mEbBMnXhyRZb0VFY5qG0Wp_z6zpGAEHi2_9WsIRAJgCls5_pbNw&usqp=CAU",
  },
  {
    price: "7.000.000đ",
    content: "Nâng cấp bổ sung phần hệ quản lý quy trình của hàng trực tuyến.",
    type: "Phần hệ",
    viewDate: "21/09/2024",
    quoteDate: "22/09/2024",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu1zbd4DOsZXlHbeu_mEbBMnXhyRZb0VFY5qG0Wp_z6zpGAEHi2_9WsIRAJgCls5_pbNw&usqp=CAU",
  },
  {
    price: "9.000.000đ",
    content: "Nâng cấp bổ sung phần hệ quản lý quy trình của chính viện.",
    type: "Phần hệ",
    viewDate: "18/09/2024",
    quoteDate: "22/09/2024",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu1zbd4DOsZXlHbeu_mEbBMnXhyRZb0VFY5qG0Wp_z6zpGAEHi2_9WsIRAJgCls5_pbNw&usqp=CAU",
  },
  {
    price: "6.000.000đ",
    content:
      "Nâng cấp bổ sung phần hệ quản lý quy trình của cửa hàng trực tuyến.",
    type: "Gói",
    viewDate: "02/09/2024",
    quoteDate: "22/09/2024",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu1zbd4DOsZXlHbeu_mEbBMnXhyRZb0VFY5qG0Wp_z6zpGAEHi2_9WsIRAJgCls5_pbNw&usqp=CAU",
  },
];

const truncateContent = (content: string, wordLimit: number) => {
  const words = content.split(" ");
  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : content;
};

export default function LichSuBaoGia() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [opened, setOpened] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setOpened(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      elements.splice(deleteIndex, 1);
      setExpandedRows((prev) => prev.filter((i) => i !== deleteIndex));
      setDeleteIndex(null);
      setOpened(false);
    }
  };

  return (
    <>
      <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3">
        <Title order={3}>Lịch sử</Title>
      </Box>
      <Box className="mb-5">
        <Box className="flex justify-between text-gray-500 font-semibold mb-3">
          <Box className="w-2/5 text-center">Nội dung</Box>
          <Box className="w-1/5 text-center">Loại</Box>
          <Box className="w-1/5 text-center">Ngày xem</Box>
          <Box className="w-1/5 text-center">Ngày báo giá</Box>
          <Box className="w-1/12 text-center"></Box>
        </Box>
        {elements.map((element : any, index) => (
          <Box key={index} className="mb-3 border rounded-lg p-3 bg-white">
            <Box className="flex justify-between items-center">
              <Box className="w-2/5 text-center flex items-center">
                <Link href={`/report/${element.id}`}>
                  <Image
                    radius="md"
                    src={element.imageUrl}
                    className="w-16 h-16 mr-4 cursor-pointer px-2 "
                  />
                </Link>
                <Box className="flex flex-col text-left">
                  <Box className="font-bold">{element.price}</Box>
                  <Link
                    href={`/report/${element.id}`}
                    className="overflow-hidden text-ellipsis cursor-pointer"
                  >
                    <Text className="truncate">
                      {truncateContent(element.content, 5)}
                    </Text>
                  </Link>
                </Box>
              </Box>
              <Box className="w-1/5 text-center">{element.type}</Box>
              <Box className="w-1/5 text-center">{element.viewDate}</Box>
              <Box className="w-1/5 text-center">{element.quoteDate}</Box>
              <Box className="w-1/12 text-center">
                 <ActionIcon variant="filled"  aria-label="Settings"   color="red">
                 <IconTrash
                  className="cursor-pointer"
                  onClick={() => handleDelete(index)}
                  style={{ width: '70%', height: '70%' }} stroke={1.5}
                
                />
                </ActionIcon>
              </Box>
            </Box>
            <Button
              variant="filled"
              size="xs"
              onClick={() => toggleRow(index)}
              className="mt-2"
            >
              {expandedRows.includes(index) ? "Ẩn chi tiết" : "Chi tiết"}
            </Button>
            {expandedRows.includes(index) && (
              <Box className="mt-3 bg-gray-100 p-3 rounded-lg">
                <Text>
                  <strong>Nội dung chi tiết: </strong>
                  {element.content}
                </Text>
                <Text>
                  <strong>Tên: </strong>
                  {element.details?.name}
                </Text>
                <Text>
                  <strong>Email: </strong>
                  {element.details?.email}
                </Text>
                <Text>
                  <strong>Số điện thoại: </strong>
                  {element.details?.phone}
                </Text>
                <Text>
                  <strong>Mã khách hàng: </strong>
                  {element.details?.code}
                </Text>
                <Text className="mt-2">{element.details?.message}</Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Modal xác nhận xóa */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Xác nhận xóa"
      >
        <Text>Bạn có chắc chắn muốn xóa báo giá này không?</Text>
        <Box className="flex justify-end mt-4">
          <Button variant="filled" onClick={() => setOpened(false)}>
            Hủy
          </Button>
          <Button color="red" onClick={confirmDelete} className="ml-2">
            Xóa
          </Button>
        </Box>
      </Modal>
    </>
  );
}