const bananaAverageSizeCm = 15;
const scaleCmPerPixel = 2;
const totalCanvasHeight = 260;
const safeMargim = 5;
const bananaSize = 30;

function realtimeGenerate() {
    var height = document.getElementById('txtHeight').value;
    var width = document.getElementById('txtWidth').value;

    if (!height || !width)
        return;

    var canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    insertBanana(context);
    insertObject(context, height, width);
}

function insertBanana(context) {
    base_image = new Image();
    base_image.src = 'banana.svg';
    heightInit = totalCanvasHeight - (bananaSize + safeMargim);
    context.drawImage(base_image, 0, heightInit, bananaSize, bananaSize);
}

function insertObject(context, height, width) {
    heightCalculated = height * scaleCmPerPixel;
    widthCalculated = width * scaleCmPerPixel;
    heightBananas = cmToBananas(height);
    widthBananas = cmToBananas(width);
    heightInit = totalCanvasHeight - (heightCalculated + safeMargim);
    marginInit = bananaSize + safeMargim;

    context.fillRect(marginInit, heightInit, widthCalculated, heightCalculated);
    // Font
    context.font = '10px Arial';
    // Height
    context.fillText(heightBananas + 'b', marginInit + widthCalculated + 2, heightInit + heightCalculated);
    // Width
    context.fillText(widthBananas + 'b', marginInit, heightInit - 2);

    context.stroke();
}

function cmToBananas(cm) {
    var banana = (cm / bananaAverageSizeCm);
    return banana.toFixed(2);
}

// To be removed to use real time generate
function validation(height, width) {

    if (!height && !width) {
        toastr["error"]("Height and Width are required.", "Required Fields")
        return false;
    } else if (!height) {
        toastr["error"]("Height is required.", "Required Fields")
        return false;
    } else if (!width) {
        toastr["error"]("Width is required.", "Required Fields")
        return false;
    }

    return true;
}