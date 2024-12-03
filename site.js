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
    context.beginPath();

    insertBanana(context);
    insertObject(context, height, width);

    confetti({
        particleCount: 200,
        scalar: 4,
        shapes: ["text"],
        shapeOptions: {
            text: {
                value: ["🍌"],
            },
        },
    });
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


    widthBegin = marginInit;
    widthEnd = marginInit + widthCalculated;
    widthMiddle = widthEnd / 2;

    heightBegin = heightInit;
    heightEnd = heightInit + heightCalculated;
    heightMiddle = (heightBegin + heightEnd) / 2;

    lineSize = 6;
    lineMiddle = 3;

    // Delimiters Horizontal
    context.moveTo(widthBegin + 1, heightBegin - lineSize);
    context.lineTo(widthBegin + 1, heightBegin - 1);

    context.moveTo(widthEnd - 1, heightBegin - lineSize);
    context.lineTo(widthEnd - 1, heightBegin - 1);

    context.moveTo(widthBegin + 2, heightBegin - lineMiddle);
    context.lineTo(widthEnd - 2, heightBegin - lineMiddle);

    // Delimiters Vertical
    context.moveTo(widthEnd + 1, heightBegin + 1);
    context.lineTo(widthEnd + lineSize, heightBegin + 1);

    context.moveTo(widthEnd + 1, heightEnd - 1);
    context.lineTo(widthEnd + lineSize, heightEnd - 1);

    context.moveTo(widthEnd + lineMiddle, heightBegin + 2);
    context.lineTo(widthEnd + lineMiddle, heightEnd - 2);

    context.font = '10px Arial';
    context.fillText(widthBananas + 'b', widthMiddle, heightBegin - lineSize);
    context.fillText(heightBananas + 'b', widthEnd + lineSize, heightMiddle);

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