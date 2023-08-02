// https://school.programmers.co.kr/learn/courses/30/lessons/176962
function solution(plans) {
    const queue = plans
        .map((plan) => {
            const [name, time, spend] = plan;
            const [hour, minute] = time.split(':');
            const convertedTime = Number(hour) * 60 + Number(minute);

            return [name, convertedTime, Number(spend)];
        })
        .sort((a, b) => a[1] - b[1]);

    const result = [];
    const first = queue.shift();
    let curTime = first[1];

    // * 스택에 보내고 작업을 수행
    const stack = [first];

    while (queue.length) {
        const target = queue.shift();
        const [_name, time, _spend] = target;
        let timeDiff = time - curTime;
        curTime = time;

        // * 시간이 남으면서 스택에 작업이 남아있는 경우
        while (stack.length && timeDiff > 0) {
            const latestPlan = stack.pop();
            const [lName, _lTime, lSpend] = latestPlan;

            if (lSpend <= timeDiff) {
                result.push(lName);
                timeDiff -= lSpend;
            } else {
                latestPlan[2] = lSpend - timeDiff;
                timeDiff = 0;
                stack.push(latestPlan);
            }
        }

        stack.push(target);
    }

    while (stack.length) {
        result.push(stack.pop()[0]);
    }

    return result;
}
// function solution(plans) {
//     debugger;
//     const plansQueue = plans
//         .slice()
//         // 시간 포맷 변경
//         .map((plan) => {
//             const time = plan[1].split(':');
//             plan[1] = Number(time[0]) * 60 + Number(time[1]);
//             plan[2] = Number(plan[2]);
//             return plan;
//         })
//         // 과제 시간 순서로 정렬
//         .sort((b, a) => a[1] - b[1]);
//
//     // stack 구조
//     let results = [];
//     const stack = [];
//
//     stack.push(plansQueue.pop());
//     // let time = stack[0][1];
//
//     while (stack.length) {
//         const currentPlan = stack.pop();
//         const currentPlanEndTime = currentPlan[1] + currentPlan[2];
//
//         // 앞으로 해야할 작업이 남았을 때
//         if (plansQueue.length) {
//             const nextQueuePlan = plansQueue[plansQueue.length - 1];
//             const nextQueuePlanStartTime = nextQueuePlan[1];
//
//             let restTime = nextQueuePlanStartTime - currentPlanEndTime;
//             // 시간이 남는 경우
//             if (restTime > 0) {
//                 results.push(currentPlan[0]);
//                 // 그만둔 작업이 있는 경우
//                 while (stack.length) {
//                     const stackPlan = stack[stack.length - 1];
//                     if (stackPlan[2] <= restTime) {
//                         results.push(stackPlan[0]);
//                         restTime -= stackPlan[2];
//                         stack.pop();
//                     } else {
//                         stackPlan[2] -= restTime;
//                         break;
//                     }
//                 }
//                 stack.push(plansQueue.pop());
//             } // 시간이 정확하게 맞는 경우
//             else if (restTime === 0) {
//                 results.push(currentPlan[0]);
//                 stack.push(plansQueue.pop());
//             } // 시간이 모자란 경우
//             else {
//                 currentPlan[2] = Math.abs(restTime);
//                 stack.push(currentPlan);
//                 stack.push(plansQueue.pop());
//             }
//         }
//         // 앞으로 해야할 작업이 남지 않았을 때
//         else {
//             results = [...results, currentPlan[0], ...stack.sort((b, a) => a[2] - b[2]).map((el) => el[0])];
//             break;
//         }
//     }
//     return results;
// }

test('과제 진행하기', () => {
    expect(
        solution([
            ['korean', '11:40', '30'],
            ['english', '12:10', '20'],
            ['math', '12:30', '40'],
        ]),
    ).toEqual(['korean', 'english', 'math']);

    expect(
        solution([
            ['science', '12:40', '50'],
            ['music', '12:20', '40'],
            ['history', '14:00', '30'],
            ['computer', '12:30', '100'],
        ]),
    ).toEqual(['science', 'history', 'computer', 'music']);
});
