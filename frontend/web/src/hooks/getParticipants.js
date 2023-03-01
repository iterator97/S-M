export const getParticipants = async (projectId) => {
  const response = await fetch(
    `http://localhost:44352/api/Project/participants/${projectId}`,
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
