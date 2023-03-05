export const getWorkTaskDependencies = async (id) => {
  const response = await fetch(
    `http://localhost:44352/api/workTask/workTaskDependencies/${id}`,
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
