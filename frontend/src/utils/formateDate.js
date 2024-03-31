// formate dates to human friendly format : like 1 hour ago, 1 day ago, 1 month ago and if it is more than a year then show the date in the format of dd/mm/yyyy

export const formateDate = (date) => {
  const currentDate = new Date();
  const postDate = new Date(date);

  const diff = currentDate - postDate;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${postDate.getDate()}/${
      postDate.getMonth() + 1
    }/${postDate.getFullYear()}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {    
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};
