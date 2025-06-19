// export const HumanDate = ({ date }) => {
//   return new Date(date.replace(/-/g, '\/')).toLocaleDateString("en-US",
//     {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       timeZone: 'America/Chicago'
//     })
// }

export const HumanDate = ({ date }) => {
  return new Date(date.replace(/-/g, '/')).toLocaleString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Chicago'
  });
};