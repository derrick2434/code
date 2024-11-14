let treeCounter = 0;
let treesPerClick = 1;
let treesPerSecond = 0;
let treePlanterInterval;
let upgradeCosts = {
    farmer: 10,
    treePlanter: 100,
    clickMultiplier: 500
};
let showClimateInfoFlag = false;

function exitGame() {
    window.location.href = 'index.html';
}

function growTree() {
    const treeImg = document.getElementById('tree');
    const counter = document.getElementById('tree-counter');

    if (treeImg.src.includes('seed.png')) {
        treeImg.src = 'sapling.png';
    } else if (treeImg.src.includes('sapling.png')) {
        treeImg.src = 'tree.png';
    } else {
        treeCounter += treesPerClick;
        counter.innerText = treeCounter;
        treeImg.src = 'seed.png';

        checkMilestones(treeCounter);
    }

    if (showClimateInfoFlag) {
        document.getElementById('climate-info').classList.add('hidden');
        showClimateInfoFlag = false;
    }

    if (treeCounter >= 1000000) {
        endGame();
    }
}

function checkMilestones(count) {
    if (count === 100 || count === 1000 || count === 10000) {
        showClimateInfo(count);
    }
}

function showClimateInfo(count) {
    const infoDiv = document.getElementById('climate-info');
    const textP = document.getElementById('climate-text');

    if (count === 100) {
        textP.innerText = "Congratulations on planting 100 trees! Trees help reduce climate change by absorbing carbon dioxide.";
    } else if (count === 1000) {
        textP.innerText = "Incredible! You've planted 1000 trees! Trees play a vital role in providing oxygen and habitat for wildlife.";
    } else if (count === 10000) {
        textP.innerText = "Amazing! 10,000 trees planted! Forests are crucial for regulating temperature and maintaining biodiversity.";
    }

    infoDiv.classList.remove('hidden');
    showClimateInfoFlag = true;
}

function closeInfo() {
    document.getElementById('climate-info').classList.add('hidden');
}

function buyUpgrade(upgrade) {
    if (treeCounter >= upgradeCosts[upgrade]) {
        treeCounter -= upgradeCosts[upgrade];

        if (upgrade === 'clickMultiplier') {
            treesPerClick *= 2;
        } else if (upgrade === 'farmer') {
            treesPerSecond += 1;
        } else if (upgrade === 'treePlanter') {
            if (!treePlanterInterval) {
                treePlanterInterval = setInterval(() => {
                    treeCounter += 10;
                    document.getElementById('tree-counter').innerText = treeCounter;
                }, 3000);
            }
        }

        upgradeCosts[upgrade] = Math.ceil(upgradeCosts[upgrade] * 1.5);

        updateUpgradeButtons();
    }

    document.getElementById('tree-counter').innerText = treeCounter;
}

function updateUpgradeButtons() {
    document.getElementById('farmer-btn').innerText = `Buy Farmer (1 Tree per Second) - Cost: ${upgradeCosts.farmer} Trees`;
    document.getElementById('treePlanter-btn').innerText = `Buy Tree Planter (10 Trees every 3 seconds) - Cost: ${upgradeCosts.treePlanter} Trees`;
    document.getElementById('clickMultiplier-btn').innerText = `Buy Click Multiplier (Doubles Clicks) - Cost: ${upgradeCosts.clickMultiplier} Trees`;
}

function endGame() {
    alert("Congratulations! You've planted 1,000,000 trees and saved the planet!");
    window.location.href = 'index.html';
}

setInterval(() => {
    treeCounter += treesPerSecond;
    document.getElementById('tree-counter').innerText = treeCounter;
}, 1000);

window.exitGame = exitGame;
window.growTree = growTree;
window.closeInfo = closeInfo;
window.buyUpgrade = buyUpgrade;
