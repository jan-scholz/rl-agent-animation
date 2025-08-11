# Agent-Environment Interaction Visualization

This interactive JavaScript animation demonstrates how an agent interacts with its environment in the context of the reinforcement learning paradigm. This is solely a visualization of the agent-environment interaction loop without any learning.

![Agent-Environment Interaction Visualization](https://talesofindustry.org/images/github/agent-environment-interaction.png)

## Features

- **Action:** Select the next action (up, down, left, right) with the action buttons or on your keyboard.
- **Environment:** Observe the impact of the action on the environment, e.g. the agent might move and receive a reward. The reward  obtained at each point in the maze is shown.
- **Agent:** Observe the current *state* (i.e. position) and the total *reward* collected by the agent.
- **State:** The state corresponds to the position of the agent within the maze.
- **Reward:** The agent receives rewards of -1 for each movement unless the agent reaches the goal where the reward is +10. Attempting to move outside the maze will not change the agent's position but return a reward of -10.


## Run

This demo can be run in the browser. Serve it with your preferred method, e.g.

```
python -m http.server --directory .
```

Then open `http://localhost:8000` in your preferred browser.


## Explanation

The agent starts at the starting square 'S' and needs to reach the goal square '🏁'. There is a penalty of -1 for each movement that is used in reinforcement learning to steer agent towards the most direct path toward their goal. In other words, the highest total reward can be obtained by reaching the goal in the least number of steps. In this case, with no obstacles, the goal can be reached in 6 steps in many equivalent ways, so the the best total reward is 5, i.e. 5 steps with -1 penalty and the final step with +10 reward (-1 * 5 + 10).

A penalty of -10 when selecting a move that would lead outside the maze is used during reinforcement learning to dissuade the agent from taking "forbidden" actions, i.e. learn not to try to move into a wall.


## Issues

Inputting multiple actions before the end of the animation can lead to weird results. Please let each individual animation play out before taking another action.
