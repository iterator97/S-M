import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import {
  Box,
  Button as MuiButton,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Item from "antd/es/descriptions/Item";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { EditableRow } from "../new-project/EditableRow";
import { EditableCell } from "../new-project/EditableCell";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getProject } from "../../../hooks/getProject";
import { getParticipants } from "../../../hooks/getParticipants";
import { saveproject } from "../../../hooks/saveProject";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";

function EditProject() {
  // Hooks
  const params = useParams();
  const dispatch = useDispatch();

  // Variables
  const [selectedProject, setSelectedProject] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [otherUsers, setOtherUsers] = useState();
  const [count, setCount] = React.useState();
  const [dataSource, setDataSource] = useState();
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // Functions
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.id !== key);
    const removeduser = dataSource.filter((item) => item.id == key);

    let newOtherUsers = otherUsers;

    newOtherUsers.push(removeduser[0]);
    setOtherUsers(newOtherUsers);

    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      editable: false,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      width: "30%",
      editable: false,
    },
    {
      title: "Akcja",
      dataIndex: "operation",
      editable: false,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Jesteś pewnien?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Usuń</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const handleChange = (event) => {
    setCount(event.target.value);
  };

  const handleUserAdd = () => {
    let newOtherUsers = otherUsers.filter((x) => x.id !== count.id);
    setOtherUsers(newOtherUsers);
    setDataSource([...dataSource, count]);
  };

  const onProjectSave = () => {
    saveproject(
      selectedProject.id,
      name,
      description,
      startDate,
      endDate,
      "test",
      dataSource
    ).then((data) => {});
  };

  useEffect(() => {
    getProject(params.id).then((data) => {
      setSelectedProject(data[0]);
      setName(data[0].name);
      setDescription(data[0].description);
      setStartDate(dayjs(data[0].startDate));
      setEndDate(dayjs(data[0].endDate));
      setDataSource(data[0].attendes);
    });

    getParticipants(params.id).then((data) => {
      setOtherUsers(data);
    });
  }, [params.id]);

  return (
    <>
      {" "}
      <Box>
        <Stack spacing={2}>
          <Item>
            <Typography variant="h5">Edytuj projekt</Typography>
          </Item>
          <Item>
            <TextField
              required
              id="outlined-required"
              label="Nazwa projektu"
              defaultValue="Uzupełnij"
              value={name}
              onChange={(newValue) => {
                setName(newValue.target.value);
              }}
            />
          </Item>
          <Item>
            <TextField
              id="outlined-multiline-static"
              label="Opis projektu"
              multiline
              rows={4}
              defaultValue="Uzupełnij"
              value={description}
              onChange={(newValue) => {
                setDescription(newValue.target.value);
              }}
            />
          </Item>
          <Item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Data startu projektu"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Item>
          <Item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Data zakończenia projektu"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Item>
          <Item
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Item
              sx={{
                width: "70% !important",
                border: "1px solid red",
              }}
            >
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Użytkownik
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={count}
                  label="Użytkownik"
                  onChange={handleChange}
                >
                  {otherUsers &&
                    otherUsers.map((item) => {
                      return <MenuItem value={item}>{item.surname}</MenuItem>;
                    })}
                </Select>
              </FormControl>
              <Item>
                <Container
                  sx={{
                    width: "160px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button type="primary" onClick={handleUserAdd}>
                    Dodaj użytkownika
                  </Button>
                </Container>
              </Item>
            </Item>
          </Item>
          <Item>
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
            <Box
              sx={{
                paddingTop: "16px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="primary"
                onClick={onProjectSave}
                icon={<SaveOutlined />}
                style={{
                  marginBottom: 16,
                  width: "250px",
                }}
              >
                Zapisz zmiany
              </Button>
            </Box>
          </Item>
        </Stack>
      </Box>
    </>
  );
}

export default EditProject;
