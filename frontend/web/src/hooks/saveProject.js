export const saveproject = async (
  Id,
  Name,
  Description,
  StartDate,
  EndDate,
  OwnerId,
  ProjectAttendees
) => {
  const response = await fetch(
    `http://localhost:44352/api/project/editProject`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        Id,
        Name,
        Description,
        StartDate,
        EndDate,
        OwnerId,
        ProjectAttendees,
      }),
    }
  );
  let data = await response.json();
  if (response.status === 200) {
    return data;
  } else {
    return -1;
  }
};
