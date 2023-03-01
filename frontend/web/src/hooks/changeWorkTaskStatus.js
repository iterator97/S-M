export const changeWorkTaskStatus = async (id, status) => {
  const response = await fetch(`http://localhost:44352/api/workTask`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      id,
      status,
    }),
  });
  let data = await response.json();
  if (response.status === 200) {
    return 1;
  } else {
    return -1;
  }
};
