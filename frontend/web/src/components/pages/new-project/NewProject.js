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
import { getProjects } from "../../../store/projects/actions/getProjects";
import { EditableRow } from "./EditableRow";
import { EditableCell } from "./EditableCell";
import { ToastContainer, toast } from "react-toastify";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";

const NewProject = () => {
  const [StartDate, setStartDate] = React.useState(dayjs("2022-04-07"));
  const [EndDate, setEndDate] = React.useState(dayjs("2022-04-07"));
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");

  const [SubProjects, setDataSource] = useState([
    {
      key: "0",
      name: "Sub project 1",
    },
    {
      key: "1",
      name: "Sub project 2",
    },
  ]);
  const [count, setCount] = useState(2);
  const dispatch = useDispatch();

  const handleDelete = (key) => {
    const newData = SubProjects.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Sub project ${count}`,
    };
    setDataSource([...SubProjects, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...SubProjects];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const defaultColumns = [
    {
      title: "Id",
      dataIndex: "key",
    },
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Akcja",
      dataIndex: "operation",
      render: (_, record) =>
        SubProjects.length >= 1 ? (
          <Popconfirm
            title="Jesteś pewnien?"
            onConfirm={() => handleDelete(record.key)}
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
        handleSave,
      }),
    };
  });

  const createProject = () => {
    let obj = {
      Name: Name,
      Description: Description,
      StartDate: StartDate,
      EndDate: EndDate,
      SubProjects: SubProjects,
    };

    const create = async () => {
      const response = await fetch("http://localhost:44352/api/project", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          Name,
          Description,
          StartDate,
          EndDate,
          SubProjects,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        console.log("Err");
      }
    };

    create()
      .then((data) => {
        toast.success(
          "Projekt utworzony, możesz go zobaczyć w sekcji twoje projekty!",
          {
            position: "top-center",
            autoClose: 20000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            draggable: true,
          }
        );
        dispatch(getProjects(localStorage.getItem("token")));
      })
      .then(() => {
        setName("");
        setDescription("");
        setDataSource([]);
      });
  };

  return (
    <Box>
      {" "}
      <ToastContainer />
      <Stack spacing={2}>
        <Item>
          <Typography variant="h5">Stwórz nowy projekt</Typography>
        </Item>
        <Item>
          <TextField
            required
            id="outlined-required"
            label="Wymagane"
            defaultValue="Uzupełnij"
            value={Name}
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
            value={Description}
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
              value={StartDate}
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
              value={EndDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
            />
          </LocalizationProvider>
        </Item>
        <Item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            margin: "0 0 0 0 ",
            border: "1px solid red",
            width: "100%",
          }}
        >
          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 16,
              width: "250px",
            }}
            icon={<PlusOutlined />}
          >
            Dodaj nową częśc projektu
          </Button>
        </Item>

        <Item>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={SubProjects}
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
              onClick={createProject}
              type="primary"
              icon={<SaveOutlined />}
              style={{
                marginBottom: 16,
                width: "250px",
              }}
            >
              Dodaj nowy projekt
            </Button>
          </Box>
        </Item>
      </Stack>
    </Box>
  );
};

export default NewProject;
