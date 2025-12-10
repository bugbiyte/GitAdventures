//define the contants and assign a variable to hold the categories
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;

let categories = [];


//Step 1: Get the category Ids
async function getCategoryIds() {
  const res = await axios.get(
    "https://rithm-jeopardy.herokuapp.com/api/categories?count=100"
  );

  const shuffled = _.shuffle(res.data);
  const ids = shuffled.slice(0, NUM_CATEGORIES).map(c => c.id);
  return ids;
}


//Step 2: Get full category data
async function getCategory(catId) {
  const res = await axios.get(
    `https://rithm-jeopardy.herokuapp.com/api/category?id=${catId}`
  );

  let clues = _.shuffle(res.data.clues).slice(0, NUM_QUESTIONS_PER_CAT);

  const formattedClues = clues.map(c => ({
    question: c.question,
    answer: c.answer,
    showing: null
  }));

  return {
    title: res.data.title,
    clues: formattedClues
  };
}


//Step 3: Populate the table
async function fillTable() {
  const $table = $("#jeopardy");
  $table.empty();

//header row 
  const $thead = $("<thead>");
  const $hrow = $("<tr>");

  for (let cat of categories) {
    $hrow.append($("<th>").text(cat.title));
  }

  $thead.append($hrow);
  $table.append($thead);

  // table  — 5 rows, 6 columns
  const $tbody = $("<tbody>");

  for (let row = 0; row < NUM_QUESTIONS_PER_CAT; row++) {
    const $tr = $("<tr>");

    for (let col = 0; col < NUM_CATEGORIES; col++) {
      const $td = $("<td>")
        .text("?")
        .attr("id", `${col}-${row}`);

      $tr.append($td);
    }

    $tbody.append($tr);
  }

  $table.append($tbody);
}


//Step 4: Handle clicking a clue
function handleClick(evt) {
  const id = evt.target.id;
  const [col, row] = id.split("-").map(Number);
  const clue = categories[col].clues[row];

  if (clue.showing === null) {
    $(evt.target).text(clue.question);
    clue.showing = "question";

  } else if (clue.showing === "question") {
    $(evt.target).text(clue.answer);
    clue.showing = "answer";

  } else {
    return; // already answered
  }
}


// 5. Loading view

function showLoadingView() {
  $("#jeopardy").empty();
  $("#jeopardy").append("<p>Loading...</p>");
  $("#start").text("Loading...");
}

function hideLoadingView() {
  $("#start").text("Restart");
}



// 6. Setup and start game
async function setupAndStart() {
  showLoadingView();

  const ids = await getCategoryIds();

  categories = [];
  for (let id of ids) {
    categories.push(await getCategory(id));
  }

  await fillTable();
  hideLoadingView();
}


// 7. Event listeners
$(function () {
  $("#start").on("click", setupAndStart);
  $("#jeopardy").on("click", "td", handleClick);
});
