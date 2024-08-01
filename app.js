const ERROR = true; //if this is true then we should

const video = document.getElementById("video");
const jsonOutput = document.getElementById("json-output");

// Function to update the JSON output
async function updateJsonOutput() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const devicesJson = JSON.stringify(devices, null, 2);
        jsonOutput.textContent = devicesJson;
    } catch (error) {
        console.error("Error retrieving devices.", error);
        jsonOutput.textContent = "Error retrieving devices: " + error.message;
    }
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request access to the camera
    const videoConstraints = {
        audio: true,
        video: {
            height: 480,
            width: 640,
        },
    };
    if (ERROR) {
        videoConstraints.video.facingMode = {
            exact: "user",
        };
    }
    navigator.mediaDevices
        .getUserMedia(videoConstraints)
        .then((stream) => {
            // Set the video source to the camera stream
            video.srcObject = stream;
            updateJsonOutput();
        })
        .catch((error) => {
            console.error("Error accessing media devices.", error);
            updateJsonOutput();
        });
} else {
    console.log("Media Devices API not supported.");
}
