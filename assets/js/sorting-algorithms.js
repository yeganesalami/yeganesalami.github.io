$(document).ready(function() {
    var results = $('*[class^="sortedList"]');
    for (i = 0; i < results.length; i++) {
        value = results[i].innerText.split(",");

        var valueClasses = results[i].className.split("-");
        var sortedIndex = valueClasses[1];


        $(`.${results[i].className}`).empty();

        for (j = 0; j < value.length; j++) {
            if (j < sortedIndex) {
                $(`.${results[i].className}`).append(`<span style="color: green">${value[j]}</span>`);
                if (j + 1 !== value.length)
                    $(`.${results[i].className}`).append(", ");
            } else {
                $(`.${results[i].className}`).append(`<span style="color: red">${value[j]}</span>`);
                if (j + 1 !== value.length)
                    $(`.${results[i].className}`).append(", ");
            }

        }
    }
});

function btnBubbleSort() {
    var items = $('#inputBubbleSort').val();
    var result = $('#resultBubbleSort');
    var counter = 1;
    result.empty();

    var arr = [];
    arr = items.split(", ").map(x => +x);

    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr.length; j++) {
            if (arr[j + 1] < arr[j]) {
                result.append(`${counter}) swap <b>${arr[j + 1]}</b> and <b>${arr[j]}</b> <br/>`);
                var swap = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = swap;
                result.append(`<b>[${arr}]</b> <br/><br/>`);
            } else {
                result.append(`${counter})  <b>${arr[j]}</b> is in right place. <br/><br/>`);
            }
            counter++;
        }
        if (i + 1 != arr.length)
            result.append("<br/> start over again </br></br></br>");
        counter = 1;
    }
}

function btnSelectionSort() {
    var items = $('#inputSelectionSort').val();
    var result = $('#resultSelectionSort');
    var counter = 1;
    result.empty();

    var arr = [];
    arr = items.split(", ").map(x => +x);

    for (j = 0; j < arr.length; j++) {
        var smallest = arr[j];
        var smallestIndex = j;
        for (i = j + 1; i < arr.length; i++) {
            if (smallest > arr[i]) {
                smallest = arr[i];
                smallestIndex = i;
            }
        }
        result.append(`${counter}) <b>${smallest}</b> is the smallest item.</br> so we swap <b>${smallest}</b> with <b>${arr[j]}</b><br/>`);
        var swap = arr[j];
        arr[j] = smallest;
        arr[smallestIndex] = swap;
        result.append(`the result will be <b>[${arr}]</b></br></br>`);
    }


}

function btnInsertionSort() {
    var items = $('#inputInsertionSort').val();
    var result = $('#resultInsertionSort');
    var counter = 1;
    result.empty();

    var arr = [];
    arr = items.split(", ").map(x => +x);

    result.append(`${counter}) we pick ${arr[0]}. it's already sorted</br></br>`);

    for (j = 1; j < arr.length; j++) {
        counter++;
        var selectedNumber = arr[j];
        result.append(`${counter}) we pick ${selectedNumber}. </br>`);
        i = j - 1;
        while (i >= 0 && arr[i] > selectedNumber) {
            result.append(`${selectedNumber} is smaller than ${arr[i]}. so we shift ${arr[i]} into right.</br>`);
            arr[i + 1] = arr[i];
            i--;
        }

        result.append(`place for number ${selectedNumber} is at index ${i+1}.</br>`);
        arr[i + 1] = selectedNumber;
        result.append(`<b>[${arr}]</b><br/><br/>`);
    }
}

function btnMergeSort() {
    var result = $('#resultMergeSort');
    result.empty();

    var items = $('#inputMergeSort').val();
    var arr = [];
    arr = items.split(", ").map(x => +x);
    mergeSort(arr);
}

function mergeSort(arr) {
    var result = $('#resultMergeSort');
    if (arr.length < 2) {
        return arr;
    }

    var middle = Math.floor(arr.length / 2);

    result.append(`<br/>The array is: <b>[${arr}]</b><br/>`);

    var leftArray = arr.splice(0, middle);

    var rightArray = arr;

    result.append(`the left array is <b>[${leftArray}]</b><br/>`);
    result.append(`the right array is <b>[${rightArray}]</b><br/>`);


    var left = mergeSort(leftArray);

    var right = mergeSort(rightArray);

    res = merge(left, right)
    result.append(`sorted array is <b>[${res}]</b><br/>`);;
    return res;
}

function merge(leftArray, rightArray) {
    var sortedArray = [];

    while (leftArray.length && rightArray.length) {
        if (leftArray[0] < rightArray[0]) {
            sortedArray.push(leftArray.shift());
        } else {
            sortedArray.push(rightArray.shift());
        }
    }
    res = sortedArray.concat(leftArray.slice().concat(rightArray.slice()));
    return res;
}