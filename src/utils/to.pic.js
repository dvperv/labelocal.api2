function arrayMin(arr) {
    let len = arr.length, min = Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
};

function arrayMax(arr) {
    let len = arr.length, max = -Infinity;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
        }
    }
    return max;
};

module.exports = {
    GrayScaleData(floatArray) {
        let max = arrayMax(floatArray); //Math.max() and Max.min() have limitations on array size
        let min = arrayMin(floatArray);
        let scale = 255 / (max - min);

        let res = new Array(floatArray.length)
        for (let i = 0; i < floatArray.length; i++)
            res[i] = Math.round((floatArray[i] - min) * scale)
        return res;
    }
}
