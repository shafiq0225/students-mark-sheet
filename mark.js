let studentsMarks = [];
let editStudentdetail = null;

const form = document.getElementById("userForm");
const rollNo = document.getElementById("roll-no");
const stdName = document.getElementById("std-name");
const tamilMark = document.getElementById("tamil-mark");
const englishMark = document.getElementById("english-mark");
const mathsMark = document.getElementById("maths-mark");
const scienceMrk = document.getElementById("science-mark");
const studentBody = document.getElementById("student-body");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const rollNumber = rollNo.value;
  const studentName = stdName.value.trim();
  const tamil = tamilMark.value;
  const english = englishMark.value;
  const maths = mathsMark.value;
  const science = scienceMrk.value;

  const studentObj = {
    rollNumber: rollNumber,
    studentName: studentName,
    tamilMark: +tamil,
    englishMark: +english,
    mathsMark: +maths,
    scienceMrk: +science,
    total: function () {
      return (
        this.tamilMark + this.englishMark + this.mathsMark + this.scienceMrk
      );
    },
    percentage: function () {
      return this.total() / 4;
    },
    grade: function () {
      if (this.total() >= 350) {
        return "O";
      } else if (this.total() <= 349 && this.total() >= 250) {
        return "A";
      } else if (this.total() <= 249) {
        return "B";
      }
    },
    status: function () {
      if (
        this.tamilMark < 35 ||
        this.englishMark < 35 ||
        this.mathsMark < 35 ||
        this.scienceMrk < 35
      ) {
        return "Fail";
      }
      return "Pass";
    },
  };

  if (editStudentdetail == null) {
    studentsMarks.push(studentObj);
  } else {
    var st = studentsMarks.findIndex((x) => x.rollNumber == editStudentdetail);
    studentsMarks[st] = studentObj;
    editStudentdetail = null;
  }
  form.reset();
  renderStudentMarkList();
});

function renderStudentMarkList() {
  studentBody.innerHTML = "";

  studentsMarks.forEach((std, index) => {
    const row = document.createElement("tr");
    // const table = document.querySelector('div');
    // table.setAttribute("class", "show");
    if (std.status() == "Fail") {
      row.setAttribute("class", "fail");
    }
    row.innerHTML = `<tr>
        <td>${std.rollNumber}</td>
        <td>${std.studentName}</td>
        <td>${std.tamilMark}</td>
        <td>${std.englishMark}</td>
        <td>${std.mathsMark}</td>
        <td>${std.scienceMrk}</td>
        <td>${std.status()}</td>
        <td>${std.grade()}</td>
        <td>${std.total()}</td>
        <td>${std.percentage()}</td>
        <td><button onclick="editStudentMark(${
          std.rollNumber
        })">Edit</button> | <button class="delete" onclick="deleteStudentMarks(${
      std.rollNumber
    })">Delete</button></td>
        `;
    studentBody.appendChild(row);
  });
}

function editStudentMark(id) {
  const detail = studentsMarks.find((x) => x.rollNumber == id);
  rollNo.value = detail.rollNumber;
  stdName.value = detail.studentName;
  tamilMark.value = detail.tamilMark;
  englishMark.value = detail.englishMark;
  mathsMark.value = detail.mathsMark;
  scienceMrk.value = detail.scienceMrk;
  editStudentdetail = id;
}

function deleteStudentMarks(id) {
  // const detail = studentsMarks.find((x) => x.rollNumber == id);
  // rollNo.value = "";
  // stdName.value = "";
  // tamilMark.value = "";
  // englishMark.value ="";
  // mathsMark.value ="";
  // scienceMrk.value ="";
  const pos = studentsMarks.findIndex((el) => el.rollNumber == id.toString());
  if (pos >= 0) studentsMarks.splice(pos, 1);
  renderStudentMarkList();
}
