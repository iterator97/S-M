export const getOtherWorkTaskDependencies = async (
  subProjectId,
  workTaskId
) => {
  const response = await fetch(
    `http://localhost:44352/api/workTask/otherDependencies/${subProjectId}/${workTaskId}`,
    {
      method: "GET",
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
