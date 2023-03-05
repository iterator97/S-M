export const addNewWorkTaskDependency = async (workTask, dependencyId) => {
  const response = await fetch(
    `http://localhost:44352/api/workTask/adddDependency/${workTask}/${dependencyId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  let data = await response.json();
  if (response.status === 200) {
    return data;
  } else {
    return -1;
  }
};
