import { useState, useMemo } from "react";
import { Box, TextInput, Textarea, Button, Group, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import FormatDate from "@/component/Format/FormatDate";
import { IconFileCheck } from "@tabler/icons-react";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

function Infomation({ onSaveData, datauser = [] }: { onSaveData: (data: any) => void, datauser: any[] }) {
  const [location, setLocation] = useState<string>("");
  const [time, setTime] = useState<Date | null>(null);
  const [timeEnd, setTimeEnd] = useState<Date | null>(null);
  const [documentName, setDocumentName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    location: "",
    time: "",
    timeEnd: "",
    documentName: "",
    description: "",
    creator: "",
  });

  const userOptions = useMemo(() => {
    return datauser.length > 0
      ? datauser.map((user) => ({ value: user.id.toString(), label: user.ten }))
      : [{ value: "", label: "Chọn người tạo", disabled: true }];
  }, [datauser]);

  const validateForm = () => {
    const newErrors = {
      location: "",
      time: "",
      timeEnd: "",
      documentName: "",
      description: "",
      creator: "",
    };
    let hasError = false;
    const now = new Date();

    if (!location) {
      newErrors.location = "Vui lòng nhập địa điểm";
      hasError = true;
    }
    if (!time) {
      newErrors.time = "Vui lòng chọn thời gian bắt đầu";
      hasError = true;
    } else if (new Date(time) <= now) {
      newErrors.time = "Thời gian bắt đầu phải là ngày trong tương lai";
      hasError = true;
    }

    if (!timeEnd) {
      newErrors.timeEnd = "Vui lòng chọn thời gian kết thúc";
      hasError = true;
    } else if (new Date(timeEnd) <= now) {
      newErrors.timeEnd = "Thời gian kết thúc phải là ngày trong tương lai";
      hasError = true;
    } else if (time && new Date(timeEnd) <= new Date(time)) {
      newErrors.timeEnd = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu";
      hasError = true;
    }
    if (!documentName) {
      newErrors.documentName = "Vui lòng nhập tên biên bản";
      hasError = true;
    }
    if (!description) {
      newErrors.description = "Vui lòng nhập mô tả cuộc họp";
      hasError = true;
    }
    if (!selectedUser) {
      newErrors.creator = "Vui lòng chọn người tạo";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleChange = (field: keyof typeof errors, value: any) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value ? "" : prevErrors[field],
    }));
  };


  const handleSave = () => {
    if (validateForm()) {
      setLoading(true);
      const formattedData = {
        ten: documentName,
        diadiem: location,
        giobatdau: time ? FormatDate(time) : null,
        gioketthuc: timeEnd ? FormatDate(timeEnd) : null,
        mota: description,
        nguoiDungId: selectedUser?.id || null,
      };
      onSaveData(formattedData);
      setLocation("");
      setTime(null);
      setTimeEnd(null);
      setDocumentName("");
      setDescription("");
      setSelectedUser(null);
    }
  };

  return (
    <>
      <FullScreenLoader visible={loading} />
      <Box className="bg-[#eceef0] p-4 rounded mb-3">
        <Box className="flex md:flex-nowrap flex-wrap mt-4">
          <Select
            label="Người tạo"
            placeholder="Chọn người tạo..."
            withAsterisk
            className="mr-4 mb-2"
            style={{ width: "100%" }}
            value={selectedUser?.id?.toString() || ""}
            onChange={(id) => {
              const user = datauser.find((user) => user.id.toString() === id);
              setSelectedUser(user);
              handleChange('creator', user);
            }}
            data={userOptions}
            error={errors.creator}
            searchable
          />
        </Box>
        <Box className="flex md:flex-nowrap flex-wrap">

          <DateTimePicker
            withAsterisk
            label="Thời gian bắt đầu"
            placeholder="Thời gian bắt đầu..."
            className="mr-4"
            style={{ width: "100%" }}
            value={time}
            onChange={(newTime) => {
              setTime(newTime);
              handleChange('time', newTime);
            }}
            error={errors.time}
          />
          <DateTimePicker
            withAsterisk
            label="Thời gian kết thúc"
            placeholder="Thời gian kết thúc..."
            className="mr-4"
            style={{ width: "100%" }}
            value={timeEnd}
            onChange={(newTime) => {
              setTimeEnd(newTime);
              handleChange('timeEnd', newTime);
            }}
            error={errors.timeEnd}
          />
        </Box>
        <Box className="flex md:flex-nowrap flex-wrap mt-4">
          <TextInput
            label="Tên biên bản"
            placeholder="Nhập tên biên bản..."
            withAsterisk
            className="mr-4"
            style={{ width: "100%" }}
            value={documentName}
            onChange={(e) => {
              setDocumentName(e.currentTarget.value);
              handleChange('documentName', e.currentTarget.value);
            }}
            error={errors.documentName}
          />
        </Box>
        <Box className="flex md:flex-nowrap flex-wrap mt-4">
          <Textarea
            label="Địa điểm"
            placeholder="Địa điểm"
            withAsterisk
            className="mr-4"
            style={{ width: "100%" }}
            value={location}
            onChange={(e) => {
              setLocation(e.currentTarget.value);
              handleChange('location', e.currentTarget.value);
            }}
            error={errors.location}
            minRows={5}
            maxRows={100}
            resize="vertical"
            autosize
          />
        </Box>


        <Box className="flex md:flex-nowrap flex-wrap mt-4">
          <Textarea
            label="Mô tả cuộc họp"
            placeholder="Nhập mô tả cuộc họp..."
            withAsterisk
            className="mr-4"
            style={{ width: "100%" }}
            value={description}
            onChange={(e) => {
              setDescription(e.currentTarget.value);
              handleChange('description', e.currentTarget.value);
            }}
            error={errors.description}
            minRows={5}
            maxRows={100}
            resize="vertical"
            autosize
          />
        </Box>

        <Group justify="end" className="mt-6">
          <Button variant="filled" onClick={handleSave}>
            <IconFileCheck stroke={2} />
            Tạo biên bản họp
          </Button>
        </Group>
      </Box>
    </>
  );
}

export default Infomation;