import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import OutlinedInput from "@mui/material/OutlinedInput";
import { getWorkTaskData } from "../../../hooks/getWorkTaskData";
import Checkbox from "@mui/material/Checkbox";
import { PlusOutlined } from "@ant-design/icons";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { getProjectusers } from "../../../hooks/getProjectUsers";
import { Select, Space, Popconfirm, Table } from "antd";
import { EditableRow } from "../new-project/EditableRow";
import { EditableCell } from "../new-project/EditableCell";
import { create_UUID } from "../../../hooks/createGuid";
import { getWorkTaskDependencies } from "../../../hooks/getWorkTaskDependencies";

import { getOtherWorkTaskDependencies } from "../../../hooks/getOtherWorkTaskDependencies";

function EditWorkTask() {
  // Hooks
  const params = useParams();

  // Variables
  const [workTask, setWorkTask] = useState();
  const [content, setContent] = useState();
  const [subContent, setSubContent] = useState();
  const [assignedWorker, setAssignedWorker] = useState();
  // const [subTasks, setSubTasks] = useState();
  const [users, setUsers] = useState();
  const [subTasks, setSubTasksDataSource] = useState();
  const [dependencies, setDependenciesDataSource] = useState();
  const [dependencyToAdd, setOtherDependencyToAdd] = useState();
  const [otherDependencies, setOtherDependencies] = useState();

  const [count, setCount] = React.useState();

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // Functions
  const handleDelete = (key) => {
    const newData = subTasks.filter((item) => item.id !== key);
    setSubTasksDataSource(newData);
  };

  const onSubTaskStatusChange = (e) => {
    let newSubTasks = subTasks.filter((item) => item.id !== e.id);
    let newTask = e;
    newTask.isDone = !e.isDone;
    newSubTasks.push(newTask);
    setSubTasksDataSource(newSubTasks);
  };

  const handleSubTaskAdd = (e) => {
    let newSub = subTasks;
    let newSubTask = {
      description: "Sample subtask",
      id: create_UUID(),
      isDone: false,
    };
    newSub.push(newSubTask);
    console.log(newSub);
    setSubTasksDataSource(newSub);
  };

  const defaultColumns = [
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
      editable: true,
    },
    {
      title: "Status",
      render: (_, record) => (
        <Checkbox
          checked={record.isDone}
          onClick={(e) => onSubTaskStatusChange(record)}
        />
      ),
      width: "30%",
      editable: false,
    },
    {
      title: "Akcja",
      dataIndex: "operation",
      render: (_, record) =>
        subTasks.length >= 1 ? (
          <Popconfirm
            title="Jesteś pewnien?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Usuń</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handeDependencyRemove = (e) => {
    console.log(e);
  };

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

  // Dependencies
  const defaultdependenciesColumns = [
    {
      title: "Tytył zależnego zadania",
      dataIndex: "workTaskDependencyTitle",
      editable: false,
    },
    {
      title: "Akcja",
      dataIndex: "operation",
      render: (_, record) =>
        subTasks.length >= 1 ? (
          <Popconfirm
            title="Jesteś pewnien?"
            onConfirm={() => handeDependencyRemove(record.id)}
          >
            <a>Usuń</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const dependenciesCol = defaultdependenciesColumns.map((col) => {
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

  const onUserChange = (e) => {
    const newUser = users.filter((item) => item.id == e);
    setAssignedWorker(newUser[0]);
  };

  const onOtherDependencyChoose = (e) => {
    setOtherDependencyToAdd(e);
  };

  const onNewDependencyAdd = async () => {
    const response = await fetch(
      `http://localhost:44352/api/workTask/addDependency/${params.taskId}/${dependencyToAdd}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({}),
      }
    );
    if (response.status === 200) {
      getWorkTaskDependencies(params.taskId).then((x) => {
        setDependenciesDataSource(x);
      });
    } else {
      return -1;
    }
  };

  useEffect(() => {
    getWorkTaskData(params.taskId).then((data) => {
      if (data) {
        setWorkTask(data);
        setContent(data.content);
        setSubContent(data.subContent);
        setAssignedWorker(data.assignWorker);
        setSubTasksDataSource(data.subTasks);
      }
    });

    getProjectusers(params.id).then((data) => {
      setUsers(data);
    });

    getWorkTaskDependencies(params.taskId).then((x) => {
      setDependenciesDataSource(x);
    });

    getOtherWorkTaskDependencies(params.subId, params.taskId).then((y) => {
      console.log(y);
      setOtherDependencies(y);
    });
  }, [params.taskId]);

  return (
    <Box>
      <Stack spacing={2}>
        <Item>
          <Typography variant="h5">Edytuj zadanie</Typography>
        </Item>
        <Item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              width: "120px",
              justifyContent: "flex-start",
            }}
            variant="body1"
          >
            Tytuł zadania
          </Typography>

          <TextField
            required
            id="outlined-required"
            value={content}
            fullWidth
            defaultValue={content}
            onChange={(newValue) => {
              setContent(newValue.target.value);
            }}
          />
        </Item>
        <Item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              width: "120px",
              justifyContent: "flex-start",
            }}
            variant="body1"
          >
            Opis zadania
          </Typography>

          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            rows={4}
            value={subContent}
            onChange={(newValue) => {
              setSubContent(newValue.target.value);
            }}
          />
        </Item>
        <Item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              width: "170px",
              justifyContent: "flex-start",
            }}
            variant="body1"
          >
            Przypisany użytkownik
          </Typography>

          <Container
            sx={{
              margin: "0 0 0 0",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <Select
              size="large"
              fullWidth
              key={assignedWorker?.id}
              value={assignedWorker?.name + " " + assignedWorker?.surname}
              style={{
                width: 150,
              }}
              onChange={onUserChange}
              options={users}
            />
          </Container>
        </Item>
        <Item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              margin: "0 0 0 0 ",
              width: "110px",
              justifyContent: "flex-start",
            }}
            variant="body1"
          >
            Podzadania
          </Typography>
        </Item>
        <Item>
          <Container>
            <Button onClick={(e) => handleSubTaskAdd(e)}>
              Add new subtask
            </Button>
            <div style={{ width: "100%" }}>
              <div>
                <Table
                  pagination={false}
                  components={components}
                  rowClassName={() => "editable-row"}
                  bordered
                  dataSource={subTasks}
                  columns={columns}
                />
              </div>
            </div>
          </Container>
        </Item>
        <Item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              margin: "0 0 0 0 ",
              width: "110px",
              justifyContent: "flex-start",
            }}
            variant="h6"
          >
            Zależności
          </Typography>
        </Item>
        <Item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <Container
            sx={{
              margin: "0 0 0 0",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <Select
              size="large"
              fullWidth
              style={{
                width: 250,
              }}
              onChange={onOtherDependencyChoose}
              options={otherDependencies}
            />
            <Button
              sx={{
                paddingLeft: "24px",
              }}
              onClick={() => onNewDependencyAdd()}
            >
              Dodaj zależne zadanie
            </Button>
          </Container>
        </Item>
        <Item>
          <Container>
            <div style={{ width: "100%" }}>
              <div>
                <Table
                  components={components}
                  rowClassName={() => "editable-row"}
                  bordered
                  dataSource={dependencies}
                  columns={dependenciesCol}
                />
              </div>
            </div>
          </Container>
        </Item>
      </Stack>
    </Box>
  );
}

export default EditWorkTask;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
