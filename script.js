document.addEventListener('DOMContentLoaded', () => {
    const mazeContainer = document.querySelector('.maze');
    const stateIndicator = document.querySelector('.state-indicator');
    const rewardIndicator = document.querySelector('.reward-indicator');
    const upButton = document.getElementById('up');
    const downButton = document.getElementById('down');
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');
    const actionCircle = document.getElementById('animation-circle-3');
    const stateCircle = document.getElementById('animation-circle');
    const rewardCircle = document.getElementById('animation-circle-2');
    const timeIndicator = document.querySelector('.time-indicator');
    const actionLabel = document.getElementById('action-arrow-label');
    const stateLabel = document.getElementById('state-arrow-label');
    const rewardLabel = document.getElementById('reward-arrow-label');

    const gridSize = 4;
    let agentPosition = { x: 0, y: 0 };
    let totalReward = 0;
    let time = 0;
    let mazeRewards = []; // New line: Declare mazeRewards

    function createMaze() {
        mazeContainer.innerHTML = '';
        mazeRewards = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0)); // New line: Initialize mazeRewards
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const cell = document.createElement('div');
                cell.classList.add('maze-cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                if (x === 0 && y === 0) {
                    cell.classList.add('start-cell');
                    cell.textContent = 'S';
                }
                if (x === gridSize - 1 && y === gridSize - 1) {
                    cell.classList.add('goal-cell');
                    cell.textContent = '🏁';
                }
                mazeContainer.appendChild(cell);
            }
        }
        updateAgentPosition();
    }

    function updateAgentPosition() {
        const cells = document.querySelectorAll('.maze-cell');
        cells.forEach(cell => {
            cell.classList.remove('agent-position');
            if (parseInt(cell.dataset.x) === agentPosition.x && parseInt(cell.dataset.y) === agentPosition.y) {
                cell.classList.add('agent-position');
            }
        });
        stateIndicator.textContent = `State: (${agentPosition.x}, ${agentPosition.y})`;
        rewardIndicator.textContent = `Reward: ${totalReward}`;
        timeIndicator.textContent = `t=${time}`;
    }

    function moveAgent(dx, dy, actionSymbol) {
        time++;
        const oldX = agentPosition.x;
        const oldY = agentPosition.y;
        const newX = agentPosition.x + dx;
        const newY = agentPosition.y + dy;

        let reward = 0;

        // Clear labels
        actionLabel.textContent = 'action';
        rewardLabel.textContent = 'reward';

        // Action animation
        actionCircle.classList.add('action-animation');

        setTimeout(() => {
            actionCircle.classList.remove('action-animation');
            actionLabel.textContent = `action ${actionSymbol}`;

            if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
                reward = -10;
                totalReward += reward;
                rewardLabel.textContent = `reward ${reward}`;

                // Add penalty to the current cell's accumulated reward
                mazeRewards[agentPosition.y][agentPosition.x] += reward; // Add penalty to the current cell
                const currentAgentCell = document.querySelector('.maze-cell.agent-position');
                if (currentAgentCell) {
                    let cellContent = '';
                    if (currentAgentCell.classList.contains('start-cell')) {
                        cellContent = 'S';
                    } else if (currentAgentCell.classList.contains('goal-cell')) {
                        cellContent = '🏁';
                    }
                    currentAgentCell.textContent = `${cellContent} ${mazeRewards[agentPosition.y][agentPosition.x]}`;
                }

                updateAgentPosition();
                return;
            }

            if (newX === gridSize - 1 && newY === gridSize - 1) {
                reward = 10;
            } else {
                reward = -1;
            }

            // State and Reward animations
            stateCircle.classList.add('state-animation');
            rewardCircle.classList.add('reward-animation');

            setTimeout(() => {
                agentPosition.x = newX;
                agentPosition.y = newY;
                totalReward += reward;
                mazeRewards[newY][newX] += reward; // New line: Accumulate reward in mazeRewards
                updateAgentPosition();
                rewardLabel.textContent = `reward ${reward}`;
                stateCircle.classList.remove('state-animation');
                rewardCircle.classList.remove('reward-animation');

                // Update the current maze cell with accumulated reward, preserving 'S' and '🏁'
                const currentAgentCell = document.querySelector('.maze-cell.agent-position');
                if (currentAgentCell) {
                    let cellContent = '';
                    if (currentAgentCell.classList.contains('start-cell')) {
                        cellContent = 'S';
                    } else if (currentAgentCell.classList.contains('goal-cell')) {
                        cellContent = '🏁';
                    }
                    // Append the accumulated reward
                    currentAgentCell.textContent = `${cellContent} ${mazeRewards[newY][newX]}`;
                }
            }, 330); // Duration of state/reward animation

        }, 330); // Duration of action animation
    }

    upButton.addEventListener('click', () => moveAgent(0, -1, '↑'));
    downButton.addEventListener('click', () => moveAgent(0, 1, '↓'));
    leftButton.addEventListener('click', () => moveAgent(-1, 0, '←'));
    rightButton.addEventListener('click', () => moveAgent(1, 0, '→'));

    const container = document.querySelector('.container');
    container.addEventListener('keydown', (e) => {
        e.preventDefault();
        switch (e.key) {
            case 'ArrowUp':
                moveAgent(0, -1, '↑');
                break;
            case 'ArrowDown':
                moveAgent(0, 1, '↓');
                break;
            case 'ArrowLeft':
                moveAgent(-1, 0, '←');
                break;
            case 'ArrowRight':
                moveAgent(1, 0, '→');
                break;
        }
    });

    const clearButton = document.getElementById('clear-button'); // New line

    function resetSimulation() {
        agentPosition = { x: 0, y: 0 };
        totalReward = 0;
        time = 0;
        updateAgentPosition(); // Update agent position and indicators

        // Reset action and reward labels
        actionLabel.textContent = 'action';
        rewardLabel.textContent = 'reward';

        // Recreate the maze to reset all cell contents, including 'S' and '🏁'
        createMaze();
    }

    clearButton.addEventListener('click', resetSimulation); // New line

    createMaze();
});