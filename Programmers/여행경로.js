function solution(tickets) {
  const result = ['ICN'];
  let stack = [];
  const visited = [];
  tickets.sort((a, b) => b[1].localeCompare(a[1]));
  const icnTickets = tickets.filter((el) => el[0] === 'ICN').pop();
  stack.push(icnTickets);
  // * DFS 실행
  while (stack.length > 0) {
    const ticket = stack.pop();
    const ticketStr = ticket.join('');
    if (visited.includes(ticketStr)) continue;
    visited.push(ticketStr);
    result.push(ticket[1]);
    const destinations = tickets.filter((el) => el[0] === ticket[1]);
    stack = stack.concat(destinations);
  }
  return result;
}

// console.log(
//   solution([
//     ['ICN', 'JFK'],
//     ['HND', 'IAD'],
//     ['JFK', 'HND'],
//   ])
// );

// ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]
console.log(
  solution([
    ['ICN', 'SFO'],
    ['ICN', 'ATL'],
    ['SFO', 'ATL'],
    ['ATL', 'ICN'],
    ['ATL', 'SFO'],
  ])
);
