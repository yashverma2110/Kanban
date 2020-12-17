export const isAuthenticated = () => {
  return localStorage.getItem("key") !== null;
};

export const generateRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getApiHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("key")}`,
  },
});

export const getUserDetails = () =>
  JSON.parse(localStorage.getItem("userProfile"));

export const getFormattedDate = (d) => {
  const date = new Date(d);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};
