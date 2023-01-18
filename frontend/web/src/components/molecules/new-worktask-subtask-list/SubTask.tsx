import { Button, Checkbox, Input } from "antd";
import React, { useState } from "react";

interface SubTaskData {
  id?: string;
  description?: string;
}

interface SubTaskProps {
  data?: SubTaskData;
  onSubTaskRemove: (id: string | undefined) => void;
  onSubTaskStatusChange?: (id: string) => void;
  onEditSubTaskConent?: (id: string, e: any) => void;
}

const SubTask = (props: SubTaskProps) => {
  let myId: string;

  if (props.data?.id) {
    myId = props.data.id;
  }

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (props.onEditSubTaskConent && props.data?.id) {
      props?.onEditSubTaskConent(props.data?.id, value);
    }
  };

  return (
    <div className="sub-task-container">
      <div className="sub-task-description">
        <Input.TextArea
          rows={1}
          onChange={handleChange}
          value={props.data?.description}
        ></Input.TextArea>
      </div>
      <div className="sub-task-action-remove">
        <Button
          type="text"
          danger
          onClick={() => props.onSubTaskRemove(props?.data?.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default SubTask;
