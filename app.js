// get elements

const student_form = document.querySelector('#student_form');
const data_list = document.querySelector('#data_list');
const modal_close = document.querySelector('#modal_disapiar');
const close_one = document.querySelector('.close');
const detailes_view = document.querySelector('.detailes_view');
const full_view = document.querySelector('.container-three');


let result = new Student();

student_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let student_name = document.querySelector('input[placeholder="Name"]');
    let roll = document.querySelector('input[placeholder="Roll Number"]');
    let stu_class = document.querySelector('input[placeholder="Class"]');
    let photo = document.querySelector('input[placeholder="Photo"]');
    let gender = document.querySelector('input[type="radio"]:checked');
    let ban = document.querySelector('input[placeholder="Bangla"]');
    let eng = document.querySelector('input[placeholder="English"]');
    let math = document.querySelector('input[placeholder="Math"]');
    let sci = document.querySelector('input[placeholder="Science"]');
    let s_sci = document.querySelector('input[placeholder="Social-science"]');
    let reli = document.querySelector('input[placeholder="Religion"]');


    if (student_name.value == '' || roll.value == '' || stu_class.value == '' || photo.value == '') {
        alert('Fileds must be fullfll');
    } else {
        let student_data = [];
        if (getData('result_app')) {
            student_data = getData('result_app');
        }
        student_data.push({
            name_one: student_name.value,
            roll: roll.value,
            class_name: stu_class.value,
            photo: photo.value,
            gender: gender.value,
            ban: ban.value,
            eng: eng.value,
            math: math.value,
            sci: sci.value,
            social: s_sci.value,
            reli: reli.value,
        })
        dataSend('result_app', student_data);

        student_form.querySelector('input[placeholder="Name"]').value = '';
        student_form.querySelector('input[placeholder="Roll Number"]').value = '';
        student_form.querySelector('input[placeholder="Class"]').value = '';
        student_form.querySelector('input[placeholder="Photo"]').value = '';
        student_form.querySelector('input[type="radio"]:checked').removeAttribute('checked');
        student_form.querySelector('input[placeholder="Bangla"]').value = '';
        student_form.querySelector('input[placeholder="English"]').value = '';
        student_form.querySelector('input[placeholder="Math"]').value = '';
        student_form.querySelector('input[placeholder="Science"]').value = '';
        student_form.querySelector('input[placeholder="Social-science"]').value = '';
        student_form.querySelector('input[placeholder="Religion"]').value = '';
    };
    allDataStudent()
});

allDataStudent()

function allDataStudent() {
    let all_data = getData('result_app');
    let data = '';
    all_data.map((student, index) => {
        data += `
         <tr>
          <td>${ index + 1}</td>
          <td>${ student.name_one}</td>
          <td>${ student.roll}</td>
          <td>${ student.class_name}</td>
          <td>${ student.gender}</td>
          <td>${result.finalCgpa( student.ban, student.eng,student.math,student.sci,student.social,student.reli,).result_cgpa }</td>
          <td>${result.finalCgpa( student.ban, student.eng,student.math,student.sci,student.social,student.reli,).result_grade }</td>
          <td><img style="width:40px;height:40px;margin:0;object-fit: cover;" src="${ student.photo}" alt=""></td>
          <td>
          <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getSingleResult(${ index })">
          view
         </button>
          <button onclick="delete_student(${ index })" class="btn btn-danger btn-sm">Delete</button>
          </td>
          </tr>
  
     `
        data_list.innerHTML = data;
    });

}

function delete_student(id) {

    let conf = confirm('Are you sure');
    if (conf) {
        let storage_data = getData('result_app');
        storage_data.splice(id, 1);
        dataSend('result_app', storage_data);
        allDataStudent();
    } else {
        return false;
    };

};
const student_result_data = document.querySelector('.student-result-data');


function getSingleResult(index) {

    let storageData = getData('result_app');

    student_result_data.innerHTML = `
 
 <img style="width: 150px; height: 200; object-fit: cover; display: block; text-align: ccenter;" src="${storageData[index].photo}" alt="">
 <div class="stu_content">
 <h5>${storageData[index].name_one}</h5>
 <small"> Gender: ${storageData[index].gender}</small>
 <p>Roll Number: ${storageData[index].roll}</p>
 <p>Class: ${storageData[index].class_name}</p>
 <p>#Serial No: ${index}</p>
 </div>
 <hr>
 <table class="table">
     <thead>
         <tr>
           <td>Subject</td>
           <td>Marks</td>
           <td>Gpa</td>
           <td>Grade</td>
           <td>CGPA</td>
           <td>Result</td>
         </tr>
     </thead>
     <tbody>
         <tr>
             <td>Bangla</td>
             <td>${storageData[index].ban}</td>
             <td>${result.result(storageData[index].ban).gpaCal}</td>
             <td>${result.result(storageData[index].ban).gradeCal}</td>
             <td rowspan="6">${result.finalCgpa( storageData[index].ban, storageData[index].eng,storageData[index].math,storageData[index].sci,storageData[index].social,storageData[index].reli,).result_cgpa }</td>
             <td rowspan="6">${result.finalCgpa( storageData[index].ban, storageData[index].eng,storageData[index].math,storageData[index].sci,storageData[index].social,storageData[index].reli,).result_grade }</td>
         </tr>
         <tr>
             <td>English</td>
             <td>${storageData[index].eng}</td>
             <td>${result.result(storageData[index].eng).gpaCal}</td>
             <td>${result.result(storageData[index].eng).gradeCal}</td>
         </tr>
         <tr>
             <td>Math</td>
             <td>${storageData[index].math}</td>
             <td>${result.result(storageData[index].math).gpaCal}</td>
             <td>${result.result(storageData[index].math).gradeCal}</td>
         </tr>
         <tr>
             <td>Science</td>
             <td>${storageData[index].sci}</td>
             <td>${result.result(storageData[index].sci).gpaCal}</td>
             <td>${result.result(storageData[index].sci).gradeCal}</td>
         </tr>
         <tr>
             <td>Social</td>
             <td>${storageData[index].social}</td>
             <td>${result.result(storageData[index].social).gpaCal}</td>
             <td>${result.result(storageData[index].social).gradeCal}</td>
         </tr>

         <tr>
             <td>Religion</td>
             <td>${storageData[index].reli}</td>
             <td>${result.result(storageData[index].reli).gpaCal}</td>
             <td>${result.result(storageData[index].reli).gradeCal}</td>
         </tr>
          
     </tbody>
 </table>
 
 
 `
}















// student_form.addEventListener('submit', function (e) {
//     e.preventDefault();

//     let student_name = document.querySelector('input[placeholder="Name"]');
//     let roll = document.querySelector('input[placeholder="Roll Number"]');
//     let stu_class = document.querySelector('input[placeholder="Class"]');
//     let photo = document.querySelector('input[placeholder="Photo"]');
//     let gender = document.querySelector('input[type="radio"]:checked');
//     let bangla = document.querySelector('input[placeholder="Bangla"]');
//     let english = document.querySelector('input[placeholder="English"]');
//     let math = document.querySelector('input[placeholder="Math"]');
//     let sci = document.querySelector('input[placeholder="Science"]');
//     let s_sci = document.querySelector('input[placeholder="Social-science"]');
//     let religion = document.querySelector('input[placeholder="Religion"]');



//     if (student_name.value == '' || roll.value == '' || stu_class.value == '' || photo.value == '') {

//         alert('All fields must be full fill')
//     } else {

//         let student_data = [];
//         if (getData('result_app')) {
//             student_data = getData('result_app');
//         }
//         student_data.push({
//             name1: student_name.value,
//             roll: roll.value,
//             className: stu_class.value,
//             photo: photo.value,
//             gender: gender.value,
//             ban: bangla.value,
//             en: english.value,
//             math: math.value,
//             sci: sci.value,
//             social: s_sci.value,
//             reli: religion.value,


//         })

//         dataSend('result_app', student_data);

//         student_form.querySelector('input[placeholder="Name"]').value = '';
//         student_form.querySelector('input[placeholder="Roll Number"]').value = '';
//         student_form.querySelector('input[placeholder="Class"]').value = '';
//         student_form.querySelector('input[placeholder="Photo"]').value = '';
//         student_form.querySelector('input[type="radio"]:checked').removeAttribute('checked');
//         student_form.querySelector('input[placeholder="Bangla"]').value = '';
//         student_form.querySelector('input[placeholder="English"]').value = '';
//         student_form.querySelector('input[placeholder="Math"]').value = '';
//         student_form.querySelector('input[placeholder="Science"]').value = '';
//         student_form.querySelector('input[placeholder="Social-science"]').value = '';
//         student_form.querySelector('input[placeholder="Religion"]').value = '';

//     }
//     allStudentData();
// });

// allStudentData();
// function allStudentData(){

//     let all_data = getData('result_app')

//     let data = '';
//     all_data.map((student , index) =>{
//         data += `
//         <tr>
//            <td>${ index + 1}</td>
//            <td>${ student.name1}</td>
//            <td>${ student.roll}</td>
//            <td>${ student.className}</td>
//            <td>${ student.gender}</td>
//            <td>Gpa</td>
//            <td>A+</td>
//            <td><img style="width:40px;height:40px;margin:0;object-fit: cover;" src="${ student.photo}" alt=""></td>
//            <td>
//            <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//            view
//            </button>
//            <button onclick="deleteStudent( ${ index })" class="btn btn-danger btn-sm">Delete</button>
//            </td>
//            </tr>

//         `
//         data_list.innerHTML = data;
//         deleteStudent();
//     });
// };


// function deleteStudent(id){
//     let storage_data = getData('result_app');
//     storage_data.splice(id, 1);
//     dataSend('result_app', storage_data);

// }

// view modal start