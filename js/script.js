// IIFE

$(function(){


//edmTrain
const EDM_TRAIN_BASE_URL = 'https://edmtrain.com';
const EDM_TRAIN_API_KEY = 'df0b827a-3ec6-494d-b53e-b6d72191cc6f';
let festivalData;

// startDate=2017-01-01&
    // https://edmtrain.com/api/events?festivalInd=true&client=df0b827a-3ec6-494d-b53e-b6d72191cc6f

 

// const $outputFestName = $('#output-fest');
// need to add the other outputs here, but first test

const $form = $('form');
    
// const $inputDriveStart = $('input[id="drive-start"]');

const $inputRegion = $("#region");
    //  the above could also be written as:
    // const $inputRegion = $("#region");
    // may want to clean up everything to that shorter form


 
    
$form.on('submit', handleGetData);



    
function handleGetData(event) {
    event.preventDefault();    

    // const driveStart = $inputDriveStart.val();
    // console.log(driveStart);

    const region = $inputRegion.val();

    // const startDate = $inputStartDate.val();
    // console.log(startDate);

    // const endDate = $inputEndDate.val();
    // console.log(endDate);


    const midwestArray = ['Iowa', 'Illinois', 'Indiana', 'Kansas', 'Michigan', 'Minnesota', 'Missouri', 
    'North Dakota', 'Nebraska', 'Ohio', 'South Dakota', 'Wisconsin'];
    

    const northeastArray = ['Connecticut', 'Massachusetts', 'Maine', 'New Hampshire', 'New Jersey', 'New York', 'Pennsylvania', 'Rhode Island', 'Vermont'];




    const southArray = ['Alabama', 'Arkansas', 'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Kentucky', 'Louisiana', 'Maryland', 'Mississippi', 'North Carolina', 'Oklahoma', 'South Carolina', 'Tennessee', 'Texas', 'Virginia', 'West Virginia'];



    const westArray = ['Alaska', 'Arizona', 'California', 'Colorado', 'Hawaii', 'Idaho', 'Montana', 'New Mexico', 'Nevada', 'Oregon', 'Utah', 'Washington', 'Wyoming'];



    const allUSArray = ['Iowa', 'Illinois', 'Indiana', 'Kansas', 'Michigan', 'Minnesota', 'Missouri', 
    'North Dakota', 'Nebraska', 'Ohio', 'South Dakota', 'Wisconsin', 'Connecticut', 'Massachusetts', 'Maine', 
    'New Hampshire', 'New Jersey', 'New York', 'Pennsylvania', 'Rhode Island', 'Vermont', 'Alabama', 'Arkansas', 
    'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Kentucky', 'Louisiana', 'Maryland', 'Mississippi', 
    'North Carolina', 'Oklahoma', 'South Carolina', 'Tennessee', 'Texas', 'Virginia', 'West Virginia', 'Alaska', 
    'Arizona', 'California', 'Colorado', 'Hawaii', 'Idaho', 'Montana', 'New Mexico', 'Nevada', 'Oregon', 
    'Utah', 'Washington', 'Wyoming'];


    $.ajax(`https://edmtrain.com/api/events?festivalInd=true&client=df0b827a-3ec6-494d-b53e-b6d72191cc6f`).then(function(data) {
        festivalData = data;

        let mrKey = Object.entries(festivalData['data']);

        mrKey.forEach(function() {
            let thisIsTheOne = mrKey.shift();
            let stateState = thisIsTheOne[1]['venue']['state'];
            
            if (region === 'Midwest') {
                if (midwestArray.includes(stateState)) {
                    appendEvent();
                }
            }

            if (region === 'Northeast') {
                if (northeastArray.includes(stateState)) {
                    appendEvent();
                }
            }

            if (region === 'South') {
                if (southArray.includes(stateState)) {
                    appendEvent();
                }
            }    

            if (region === 'West') {
                if (westArray.includes(stateState)) {
                    appendEvent();
                }
            } 

            if (region === 'all US') {
                if (allUSArray.includes(stateState)) {
                    appendEvent();
                }
            }      

            if (region === 'other') {
                if (allUSArray.includes(stateState) === false && thisIsTheOne[1]['venue']['location'] !== 'Virtual')  {
                    appendEvent();
                } 
            } 

            function appendEvent(){
                let currentFestBeingAddedNow =
                $(`<tr>
                <td>${thisIsTheOne[1]['name']}</td>
                <td>${thisIsTheOne[1]['venue']['location']}</td>
                <td>${thisIsTheOne[1]['date']}</td>
                <td>  <a href=${thisIsTheOne[1]['link']} target="_blank"> <i class="fas fa-external-link-alt"></i></a></td>
                </tr>`)
                $('tbody').append(currentFestBeingAddedNow);
            }

        })

        }, function(error) {
        console.log(error);
        })
    }

     $('#reset').click(function () {
        $("table").find("tr:gt(0)").remove();
    });
     

});