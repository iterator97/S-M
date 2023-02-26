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
import { getOtherParticipants } from "../../../store/projects/actions/getOtherParticipants";
import { EditableRow } from "../new-project/EditableRow";
import { EditableCell } from "../new-project/EditableCell";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function EditProject() {
  let params = useParams();
  const dispatch = useDispatch();

  const selectedProject = useAppSelector((state) =>
    state.projects.projects?.filter((x) => x.id == params.id)
  );

  const [otherUsers, setOtherUsers] = useState(
    useAppSelector((state) => state.projects.otherUsers)
  );

  const [startDate, setStartDate] = React.useState(
    dayjs(selectedProject[0].startDate)
  );
  const [endDate, setEndDate] = React.useState(
    dayjs(selectedProject[0].endDate)
  );
  const [name, setName] = useState(selectedProject[0].name);
  const [description, setDescription] = useState(
    selectedProject[0].description
  );

  /////////////////////////////////////////////////////////////////////

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const [dataSource, setDataSource] = useState(selectedProject[0].attendes);

  console.log("DUpa");
  console.log(otherUsers);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.id !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Surname",
      dataIndex: "surname",
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

  //////////////////////////////
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleUserAdd = () => {
    let newOtherUsers = otherUsers.filter((x) => x.id !== age.id);
    setOtherUsers(newOtherUsers);
    setDataSource([...dataSource, age]);
  };

  useEffect(() => {
    dispatch(getOtherParticipants(params.id));
  }, []);

  return (
    <>
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
          <Item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Użytkownik</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Użytkownik"
                onChange={handleChange}
              >
                {otherUsers.map((item) => {
                  return <MenuItem value={item}>{item.surname}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <Button onClick={handleUserAdd}>Dodaj użytkownika</Button>
          </Item>
          <Item>
            <Container>
              <div style={{ height: 400, width: "100%" }}>
                <div>
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
        </Stack>
      </Box>
    </>
  );
}

export default EditProject;
