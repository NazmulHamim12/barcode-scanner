const scanBtn = document.getElementById("scanBtn");
const video = document.getElementById("video");
const result = document.getElementById("result");
const scannerContainer = document.getElementById("scanner-container");

const codeReader = new ZXing.BrowserMultiFormatReader();

scanBtn.addEventListener("click", startScanner);

async function startScanner() {

    scannerContainer.style.display = "block";

    try {

        const devices = await codeReader.listVideoInputDevices();

        let backCameraId = devices[0].deviceId;

        const backCamera = devices.find(device =>
            device.label.toLowerCase().includes("back")
        );

        if(backCamera){
            backCameraId = backCamera.deviceId;
        }

        codeReader.decodeFromVideoDevice(
            backCameraId,
            "video",
            (scanResult, err) => {

                if(scanResult){

                    result.innerHTML =
                        `Scanned Code:<br><br>${scanResult.text}`;

                    codeReader.reset();

                    scannerContainer.style.display = "none";
                }

            }
        );

    }
    catch(error){

        result.innerText =
            "Camera Open Failed";

        console.error(error);
    }
}