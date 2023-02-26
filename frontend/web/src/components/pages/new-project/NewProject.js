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
import { createNewProject } from "../../../store/projects/actions/createNewProject";
import { getProjects } from "../../../store/projects/actions/getProjects";
import { EditableRow } from "./EditableRow";
import { EditableCell } from "./EditableCell";

const NewProject = () => {
  const [startDate, setStartDate] = React.useState(dayjs("2022-04-07"));
  const [endDate, setEndDate] = React.useState(dayjs("2022-04-07"));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [dataSource, setDataSource] = useState([
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
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `New sub project ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
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
        dataSource.length >= 1 ? (
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
      Name: name,
      Description: description,
      StartDate: startDate,
      EndDate: endDate,
      SubProjects: dataSource,
    };

    dispatch(createNewProject(obj));
    dispatch(getProjects(localStorage.getItem("token")));
  };

  return (
    <Box>
      {" "}
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
        <Item>
          <Container>
            <div style={{ height: 400, width: "100%" }}>
              <div>
                <Button
                  onClick={handleAdd}
                  type="primary"
                  style={{
                    marginBottom: 16,
                  }}
                >
                  Dodaj nową częśc projektu
                </Button>
                <Table
                  components={components}
                  rowClassName={() => "editable-row"}
                  bordered
                  dataSource={dataSource}
                  columns={columns}
                />
              </div>
            </div>
          </Container>
        </Item>
        <Item>
          <Container>
            <Button
              onClick={createProject}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Dodaj nowy projekt
            </Button>
          </Container>
        </Item>
      </Stack>
    </Box>
  );
};

export default NewProject;
