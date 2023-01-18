import React, { useEffect, useState } from "react";
import { Checkbox, Button } from "antd";
import { Table, Tag, Space, Popconfirm } from "antd";
import SubTask from "./SubTask";
import Icon, { PlusOutlined } from "@ant-design/icons";

import "./SubTaskList.css";

interface SubTaskData {
  id?: string;
  description?: string;
}

interface SubTaskListProps {
  subtasks?: Array<SubTaskData> | undefined;
  onSubTaskRemove: (id: string | undefined) => void;
  onAddNewSubTask: () => void;
  onEditSubTaskConent?: (id: string, e: any) => void;
}

const SubTaskList = (props: SubTaskListProps) => {
  const [subTasks, setSubTasks] = useState<Array<SubTaskData> | undefined>(
    props.subtasks
  );

  useEffect(() => {
    setSubTasks(props.subtasks);
  }, [props]);

  return (
    <div>
      <div className="add-new-task-button">
        <Button
          type="link"
          icon={<PlusOutlined />}
          onClick={props.onAddNewSubTask}
        >
          Add new subtask
        </Button>
      </div>

      {subTasks?.map((x: any) => {
        return <SubTask data={x} onSubTaskRemove={props.onSubTaskRemove} />;
      })}
    </div>
  );
};

export default SubTaskList;
