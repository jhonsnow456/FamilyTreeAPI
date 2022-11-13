const express = require("express");
const Electoral = require("../models/electoral");
const Place = require("../models/place");
const { createPdf } = require("../pdfCreator");
const router = express.Router();

let arr;
let graph = [];
let house = -1;
let personName = "";
let personAge = -1;

function getAllName() {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]["House Number"] !== house) {
      continue;
    }
    if (!graph[arr[i]["Name"]]) {
      graph[arr[i]["Name"]] = {
        VoterId: arr[i]["VoterId"],
        Name: arr[i]["Name"],
        Child: [],
        Gender: arr[i]["Gender"],
      };
    }
    if (arr[i]["Father Name"] && !graph[arr[i]["Father Name"]]) {
      graph[arr[i]["Father Name"]] = {
        VoterId: arr[i]["VoterId"],
        Name: arr[i]["Father Name"],
        Child: [],
        Gender: arr[i]["Gender"],
      };
    }
    if (arr[i]["Husband Name"] && !graph[arr[i]["Husband Name"]]) {
      graph[arr[i]["Husband Name"]] = {
        VoterId: arr[i]["VoterId"],
        Name: arr[i]["Husband Name"],
        Child: [],
        Gender: arr[i]["Gender"],
      };
    }
  }
}
function findNode(name, othername, type) {
  if (type === "Father") {
    graph[name]["Child"].push(othername);
  } else if (type == "Child") {
    graph[name]["Father"] = othername;
  } else if (type == "Husband") {
    graph[name]["Wife"] = othername;
  } else {
    graph[name]["Husband"] = othername;
  }
}

let relation = [];
const levelRelation = ["", "Grand", "Great Grand"];

function childRelation(name, level, down) {
  if (graph[name]["Child"].length === 0) {
    return;
  }
  for (let i = 0; i < graph[name]["Child"].length; i++) {
    relation.push({
      voterid: graph[graph[name]["Child"][i]]["VoterId"],
      name: graph[name]["Child"][i],
      relation: `${levelRelation[level]}${down}`,
    });
    childRelation(graph[name]["Child"][i], level + 1, down);
  }
}

function findRelation(name) {
  let up = "Son";
  let down = "Father";
  let level = "Wife";
  if (graph[name]["Gender"] === "FEMALE") {
    up = "Daughter";
    down = "Mother";
    level = "Husband";
  }
  if (graph[name][level]) {
    relation.push({
      voterid: graph[graph[name][level]]["VoterId"],
      name: graph[name][level],
      relation: level,
    });
  }

  let traName = name;
  for (let i = 0; i < 3; i++) {
    if (graph[traName]["Father"]) {
      relation.push({
        voterid: graph[graph[traName]["Father"]]["VoterId"],
        name: graph[traName]["Father"],
        relation: `${levelRelation[i]}${up}`,
      });
      traName = graph[traName]["Father"];
    } else {
      break;
    }
  }
  childRelation(name, 0, down);
}

// Post Route for finding Relations of a person

router.post("/", async (req, res) => {
  const { VoterId, State, District, Village, Pin_code } = req.body;
  try {
    relation = [];
    graph = [];
    house = -1;
    personName = "";
    personAge = -1;
    const placedata = await Place.findOne({
      state: State,
      district: District,
      village: Village,
      pin_code: Pin_code,
    });
    const placeid = placedata.place_id;
    const electoraldata = await Electoral.findOne({ place_id: placeid });
    const data = electoraldata.data;
    arr = data;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]["VoterId"].toLowerCase() === VoterId.toLowerCase()) {
        house = arr[i]["House Number"];
        personName = arr[i]["Name"];
        personAge = arr[i]["Age"];
        break;
      }
    }

    getAllName();

    for (let i = 0; i < arr.length; i++) {
      if (arr[i]["House Number"] !== house) {
        continue;
      }
      if (arr[i]["Father Name"] !== "-") {
        findNode(arr[i]["Father Name"], arr[i]["Name"], "Father");
        findNode(arr[i]["Name"], arr[i]["Father Name"], "Child");
      } else {
        findNode(arr[i]["Husband Name"], arr[i]["Name"], "Husband");
        findNode(arr[i]["Name"], arr[i]["Husband Name"], "Wife");
      }
    }

    findRelation(personName);
    const pdfData = {
      Name: personName,
      Age: personAge,
      relations: relation,
    };
    createPdf(pdfData);
    return res.status(200).send({
      Name: personName,
      Age: personAge,
      relation: relation,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
