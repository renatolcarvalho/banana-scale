const bananaAverageSizeCm = 15;
const scaleCmPerPixel = 3.3;
const totalCanvasHeight = 300;
const marginObject = 5;
const bananaSize = 50;

function generate() {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    var height = document.getElementById('txtHeight').value;
    var width = document.getElementById('txtWidth').value;

    if (!validation(height, width))
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
    heightInit = totalCanvasHeight - (bananaSize + marginObject);
    context.drawImage(base_image, 0, 245, bananaSize, bananaSize);
}

function insertObject(context, height, width) {
    heightCalculated = height * scaleCmPerPixel;
    widthCalculated = width * scaleCmPerPixel;
    heightInit = totalCanvasHeight - (heightCalculated + marginObject);

    context.fillRect(55, heightInit, widthCalculated, heightCalculated);
    context.stroke();
}

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