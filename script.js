gsap.registerPlugin(ScrollTrigger);

function toggleNav() {
  var sidebar = document.getElementById("mySidebar");
  var button = document.getElementById("togglebutton");

  if (sidebar.style.width === "300px") {
    sidebar.style.width = "0";
    button.innerHTML = "☰";
  } else {
    sidebar.style.width = "300px";
    button.innerHTML = "✖";
  }
}

let isPaused = false;
let speed = 500; // Default speed

let arr = [];

$("#slider").on("input", function () {
  const n = $(this).val();
  arr.length = 0;

  for (let i = 0; i < n; i++) {
    arr[i] = Math.random();
  }

  showBars();
});

function animate(moves) {
  if (moves.length == 0 || isPaused) {
    showBars();
    return;
  }

  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  showBars(move);
  setTimeout(() => {
    animate(moves);
  }, speed);
}

// Add these functions to control the animation
function bubbleplay() {
  isPaused = false;
  bubble();
}
function selectionplay() {
  isPaused = false;
  SelectionSort();
}
function heapplay() {
  isPaused = false;
  heap();
}
function quickplay() {
  isPaused = false;
  quick();
}
function customplay() {
  isPaused = false;
  custom();
}
function insertionplay() {
  isPaused = false;
  insertion();
}
function mergeplay() {
  isPaused = false;
  merge();
}

function pause() {
  isPaused = true;
}

function setSpeed(newSpeed) {
  speed = newSpeed;
}

function showBars(move) {
  $("#container").html("");
  $("#label").html("");
  console.log(arr);
  var temp = 0;
  for (let i = 0; i < arr.length; i++) {
    const bar = $("<div></div>");
    bar.css("height", arr[i] * 100 + "%");

    // Get the width of the container dynamically
    var containerWidth = $("#container").width();
    console.log(containerWidth);
    var barWidth = containerWidth / arr.length;

    bar.css("width", barWidth + "px");
    bar.css("left", temp + "px");
    temp += barWidth;
    bar.addClass("bar");
    if (move && move.indices.includes(i)) {
      bar.css(
        "background",
        move.type == "swap"
          ? "linear-gradient(0deg, rgb(255, 0, 0) 5%, rgba(210, 210, 210, 1) 100%)"
          : "linear-gradient(0deg, rgb(13, 0, 255) 5%, rgba(210, 210, 210, 1) 100%)"
      );
    }
    $("#container").append(bar);
  }
  $("#speed").html(speed);
  $("#label").html(arr.length);
}

showBars();

// Update bars whenever the window is resized
$(window).resize(function () {
  showBars();
});

//BUbble Sort
function bubblesort(arr) {
  var moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < arr.length; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (arr[i - 1] > arr[i]) {
        moves.push({ indices: [i - 1, i], type: "swap" });
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
      }
    }
  } while (swapped);
  return moves;
}

function bubble() {
  const copy = [...arr];
  const moves = bubblesort(copy);
  animate(moves);
}

//Selection Sort
function SelectionSort() {
  const scopy = [...arr];
  const smoves = selectionsort(scopy);
  animate(smoves);
}

function selectionsort(arr) {
  var moves = [];
  let n = arr.length;
  let min, i, j;
  for (i = 0; i < n - 1; ++i) {
    min = i;
    for (j = i + 1; j < n; j++) {
      moves.push({ indices: [min, j], type: "comp" });
      if (arr[j] < arr[min]) min = j;
    }

    if (min != i) {
      moves.push({ indices: [i, min], type: "swap" });
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return moves;
}

//Quick sort
function quicksort(arr, low = 0, high = arr.length - 1, moves = []) {
  if (low < high) {
    let pi = partition(arr, low, high, moves);
    quicksort(arr, low, pi - 1, moves);
    quicksort(arr, pi + 1, high, moves);
  }
  return moves;
}

function partition(arr, low, high, moves) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    moves.push({ indices: [i + 1, j], type: "comp" });
    if (arr[j] < pivot) {
      i++;
      moves.push({ indices: [i, j], type: "swap" });
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  moves.push({ indices: [i + 1, high], type: "swap" });
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quick() {
  const copy = [...arr];
  const moves = quicksort(copy);
  animate(moves);
}

//insertion sort

function insertionsort(arr) {
  var moves = [];
  let n = arr.length;
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;

    moves.push({ indices: [j, i], type: "comp" });
    while (j >= 0 && arr[j] > key) {
      moves.push({ indices: [j, j + 1], type: "swap" });
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return moves;
}

function insertion() {
  const copy = [...arr];
  const moves = insertionsort(copy);
  animate(moves);
}

//Heap Sort
function heapify(arr, n, i, moves) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    moves.push({ indices: [i, largest], type: "swap" });
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, moves);
  }
}

function heapSort(arr) {
  let n = arr.length;
  let moves = [];

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, moves);
  }

  for (let i = n - 1; i > 0; i--) {
    moves.push({ indices: [0, i], type: "swap" });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0, moves);
  }

  return moves;
}

function heap() {
  const copy = [...arr];
  const moves = heapSort(copy);
  animate(moves);
}

//merge sort
function mergeSort(arr, start = 0, end = arr.length - 1, moves = []) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    mergeSort(arr, start, mid, moves);
    mergeSort(arr, mid + 1, end, moves);
    merge(arr, start, mid, end, moves);
  }
  return moves;
}

function merge(arr, start, mid, end, moves) {
  let start2 = mid + 1;

  if (arr[mid] <= arr[start2]) {
    return;
  }

  while (start <= mid && start2 <= end) {
    moves.push({ indices: [start, start2], type: "comp" });
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      let value = arr[start2];
      let index = start2;

      while (index != start) {
        moves.push({ indices: [index - 1, index], type: "swap" });
        arr[index] = arr[index - 1];
        index--;
      }
      arr[start] = value;

      start++;
      mid++;
      start2++;
    }
  }
}

function merge() {
  const copy = [...arr];
  const moves = mergeSort(copy);
  animate(moves);
}

function customsort(arr) {
  var codes = document.getElementById("exampleFormControlTextarea1");
  eval(codes);
}

function custom() {
  const copy = [...arr];
  const moves = customsort(copy);
  animate(moves);
}

gsap.fromTo(
  ".menu-box",
  { x: -1200 },
  {
    scrollTrigger: {
      trigger: ".menu-box",
      // pin: true,
      toggleActions: "restart none none none",
    },
    x: 0,
    duration: 2,
  }
);
gsap.fromTo(
  ".comp-table",
  { x: 1200 },
  {
    scrollTrigger: {
      trigger: ".comp-table",
      // pin: true,
      toggleActions: "restart none none none",
    },
    x: 0,
    duration: 1,
  }
);
