const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const leaves = [];
const leafColors = ['#FFA500', '#FF4500', '#FFD700', '#8B4513'];

function createLeaf() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 1,
        size: Math.random() * 5 + 3,
        color: leafColors[Math.floor(Math.random() * leafColors.length)]
    };
}

function addLeaves(count) {
    for (let i = 0; i < count; i++) {
        leaves.push(createLeaf());
    }
}

function updateLeaves() {
    for (let leaf of leaves) {
        leaf.y += leaf.speed;
        if (leaf.y > canvas.height) {
            leaf.y = -leaf.size;
            leaf.x = Math.random() * canvas.width;
        }
    }
}

function drawLeaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let leaf of leaves) {
        ctx.fillStyle = leaf.color;
        ctx.beginPath();
        ctx.arc(leaf.x, leaf.y, leaf.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    updateLeaves();
    drawLeaves();
    requestAnimationFrame(animate);
}

addLeaves(100);
animate();

window.onresize = function() {
    canvas.width = window .innerWidth;
    canvas.height = window.innerHeight;
};

function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown";
    let version = "Unknown";

    // Chrome
    if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Chrome";
        version = userAgent.split("Chrome/")[1].split(" ")[0];
    }
    // Firefox
    else if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Firefox";
        version = userAgent.split("Firefox/")[1];
    }
    // Edge
    else if (userAgent.indexOf("Edg") > -1) {
        browserName = "Edge";
        version = userAgent.split("Edg/")[1];
    }
    // Safari
    else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
        browserName = "Safari";
        version = userAgent.split("Version/")[1].split(" ")[0];
    }
    // Opera
    else if (userAgent.indexOf("OPR") > -1) {
        browserName = "Opera";
        version = userAgent.split("OPR/")[1];
    }
    // Internet Explorer
    else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
        browserName = "Internet Explorer";
        version = userAgent.indexOf("MSIE") > -1 ? userAgent.split("MSIE ")[1].split(";")[0] : userAgent.split("rv:")[1].split(")")[0];
    }

    return {
        browser: browserName,
        version: version
    };
}

function getOSInfo() {
    const userAgent = navigator.userAgent;
    let osName = "Unknown";
    let bitVersion = "";

    if (userAgent.indexOf("Win") > -1) {
        osName = "Windows";
        bitVersion = userAgent.indexOf("x") > -1 ? "64-bit" : "32-bit";

        if (userAgent.indexOf("Windows NT 10.0") > -1) {
            osName = "Windows 10";
        } else if (userAgent.indexOf("Windows NT 11.0") > -1) {
            osName = "Windows 11";
        } else if (userAgent.indexOf("Windows NT 6.3") > -1) {
            osName = "Windows 8.1";
        } else if (userAgent.indexOf("Windows NT 6.2") > -1) {
            osName = "Windows 8";
        } else if (userAgent.indexOf("Windows NT 6.1") > -1) {
            osName = "Windows 7";
        }
    } else if (userAgent.indexOf("Mac") > -1) {
        osName = "MacOS";
    } else if (userAgent.indexOf("Linux") > -1) {
        osName = "Linux";
    } else if (userAgent.indexOf("Android") > -1) {
        osName = "Android";
    } else if (userAgent.indexOf("like Mac") > -1) {
        osName = "iOS";
    }

    return {
        os: osName,
        bit: bitVersion
    };
}

const browserInfo = getBrowserInfo();
const osInfo = getOSInfo();

let devToolsOpened = false;
const checkDevTools = setInterval(async() => {
    if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
        devToolsOpened = true;
        window.history.forward();
        clearInterval(checkDevTools);
    }
}, 1);



function displayInfo() {
    const infoBox = document.getElementById("info-box");
    infoBox.innerHTML = `
        <strong>Browser:</strong> ${browserInfo.browser} <br>
        <strong>Version:</strong> ${browserInfo.version} <br>
        <strong>OS:</strong> ${osInfo.os} <br>
        <strong>Bit:</strong> ${osInfo.bit} <br>
    `;
}

setInterval(displayInfo, 1000);

window.onload = displayInfo;