document.addEventListener('DOMContentLoaded', () => {
    const mazeContainer = document.querySelector('.maze');
    const stateIndicator = document.querySelector('.state-indicator');
    const rewardIndicator = document.querySelector('.reward-indicator');
    const upButton = document.getElementById('up');
    const downButton = document.getElementById('down');
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');
    const animationCircle = document.getElementById('animation-circle');
    const animationCircle2 = document.getElementById('animation-circle-2');
    const timeIndicator = document.querySelector('.time-indicator');
    const actionLabel = document.querySelector('text[x="400"]');
    const rewardLabel = document.querySelector('text[x="100"]');

    const gridSize = 4;
    let agentPosition = { x: 0, y: 0 };
    let totalReward = 0;
    let time = 0;

    function createMaze() {
        mazeContainer.innerHTML = '';
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
        stateIndicator.textContent = `Position: (${agentPosition.x}, ${agentPosition.y})`;
        rewardIndicator.textContent = `Reward: ${totalReward}`;
        timeIndicator.textContent = `t=${time}`;
    }

    function moveAgent(dx, dy, actionSymbol) {
        time++;
        const newX = agentPosition.x + dx;
        const newY = agentPosition.y + dy;

        let reward = 0;

        if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
            reward = -10;
            totalReward += reward;
            actionLabel.textContent = `action ${actionSymbol}`;
            rewardLabel.textContent = `reward ${reward}`;
            updateAgentPosition();
            return;
        }

        if (newX === gridSize - 1 && newY === gridSize - 1) {
            reward = 10;
        } else {
            reward = -1;
        }

        // Animate the circles
        animationCircle.classList.add('state-animation');
        animationCircle2.classList.add('reward-animation');

        // Update position and reward after animation
        setTimeout(() => {
            agentPosition.x = newX;
            agentPosition.y = newY;
            totalReward += reward;
            updateAgentPosition();
            actionLabel.textContent = `action ${actionSymbol}`;
            rewardLabel.textContent = `reward ${reward}`;
            animationCircle.classList.remove('state-animation');
            animationCircle2.classList.remove('reward-animation');
        }, 500); // Duration of the animation
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

    createMaze();
});
