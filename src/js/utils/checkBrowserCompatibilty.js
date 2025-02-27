import { Capacitor } from "@capacitor/core";

export function isChromium() {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
    if (!navigator.userAgentData) {
        console.log(navigator.userAgent);
        return false;
    }

    console.log(navigator.userAgentData);
    // https://learn.microsoft.com/en-us/microsoft-edge/web-platform/user-agent-guidance
    return navigator.userAgentData.brands.some((brand) => {
        return brand.brand == "Chromium";
    });
}

export function isAndroid() {
    if (Capacitor.isNativePlatform()) {
        return Capacitor.getPlatform() === "android";
    }
    return false;
}

export function isIOS() {
    if (Capacitor.isNativePlatform()) {
        return Capacitor.getPlatform() === "ios";
    }
    return false;
}

export function isWeb() {
    if (Capacitor.isNativePlatform()) {
        return Capacitor.getPlatform() === "web";
    }
    if (navigator.userAgentData) {
        return ["Linux", "Mac", "Windows"].includes(navigator.userAgentData.platform);
    }
}

export function checkBrowserCompatibility() {
    const androidDevice = isAndroid();
    const iosDevice = isIOS();
    const web = isWeb();
    const webSerial = "serial" in navigator;
    const isNative = Capacitor.isNativePlatform();

    const compatible = isNative || (web && webSerial && isChromium());

    console.log("Android: ", androidDevice);
    console.log("iOS: ", iosDevice);
    console.log("Web: ", web);
    console.log("Web Serial: ", webSerial);
    console.log("Native: ", isNative);

    if (compatible) {
        return true;
    }

    let errorMessage = "";
    if (!isChromium()) {
        errorMessage = "Betaflight app requires a Chromium based browser (Chrome, Chromium, Edge).";
    }

    if (!webSerial) {
        errorMessage += " Web Serial API support is disabled.";
    }

    const newDiv = document.createElement("div");

    $("body")
        .empty()
        .css({
            height: "100%",
            display: "grid",
            "background-image": "url(../images/osd-bg-1.jpg",
            "background-size": "cover",
            "background-repeat": "no-repeat",
        })
        .append(newDiv);

    $("div").append(errorMessage).css({
        "font-size": "16px",
        "background-color": "var(--surface-200)",
        color: "var(--text)",
        padding: "1rem",
        margin: "auto",
        "border-radius": "0.75rem",
        border: "2px solid var(--surface-500)",
    });

    throw new Error("No compatible browser found.");
}
