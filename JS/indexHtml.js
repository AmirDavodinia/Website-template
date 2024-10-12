
function toggleTheme() {
    document.documentElement.classList.toggle('light-theme');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (document.documentElement.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = 'Dark Theme';

    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeText.textContent = 'Light Theme';
    }
}



document.addEventListener('DOMContentLoaded', function() {
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    fadeElems.forEach(elem => observer.observe(elem));
});

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

console.warn(`مرورگر در حال استفاده: ${browserInfo.browser + " " + browserInfo.version} ورژن سیستم عامل و مشخصات: ${osInfo.os + " " + osInfo.bit}`)

const copyRightElement = document.getElementById("footer-copyright");
const date = new Date()
const yearVaild = date.getFullYear();

copyRightElement.outerText = `© ${String(yearVaild)} Amir Davoodinia. All rights reserved.`

