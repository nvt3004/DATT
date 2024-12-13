"use client";
import { useState, useEffect } from "react";
import { Box, Input, Button } from "@mantine/core";

import { Ielements } from "./Component/Ielements";
import Infomation from "./Component/infomation";
import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "@/store/slices/report/repostAction";
import { ThunkDispatch } from "redux-thunk";
import { fetchAll_User } from "@/store/slices/user/userAction";
import { useRouter } from "next/navigation";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

function Report() {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [data, setData] = useState<Ielements[]>([]);
  const [savedData, setSavedData] = useState<any>(null);
  const { items, loading, error } = useSelector((state: any) => state.user);
  const [loadingnvg, setLoadingnvg] = useState(false);

  useEffect(() => {
    dispatch(fetchAll_User());
  }, [dispatch]);

  const handleAddInfo = async (data: any) => {
    if (data) {
      setSavedData(data);
      try {
        dispatch(addReport(data))
          .then(() => {
            notifications.show({
              title: 'Thành công',
              message: 'Đã thêm biên bản họp!',
              color: 'green',
              position: "top-right"
            });
            setLoadingnvg(true);
            router.push('/system/report')
          })
          .catch((error) => {
            console.log(error);
            notifications.show({
              title: 'Lỗi',
              message: 'Có lỗi xảy ra khi thêm biên bản!',
              color: 'red',
              position: "top-right"
            });
          });
        setData([])
      } catch (error) {
        console.error("Có lỗi xảy ra khi thêm dữ liệu:", error);
      }
    }
  };

  useEffect(() => {
    handleAddInfo;
  }, [dispatch]);

  const handleBack = () => {
    setLoadingnvg(true);
    router.push(`/system/report`);
  }

  return (
    <>
    <FullScreenLoader visible={loadingnvg} />
      <Box className="py-2 px-2 bg-[#339af0] text-white rounded-md my-3">
        <Input.Label size="17">Thông tin chung</Input.Label>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
          <Button onClick={() => handleBack()}
            leftSection={<IconArrowNarrowLeft size={20} />}
            >
            Trở lại
          </Button>
        </Box>
      <Infomation onSaveData={handleAddInfo} datauser={items} />
    </>
  );
}

export default Report;
