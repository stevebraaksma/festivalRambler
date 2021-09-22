// IIFE

$(function(){


//edmtrain API
const EDM_TRAIN_BASE_URL = 'https://edmtrain.com';
const EDM_TRAIN_API_KEY = 'df0b827a-3ec6-494d-b53e-b6d72191cc6f';

// regions
const midwestArray = ['Iowa', 'Illinois', 'Indiana', 'Kansas', 'Michigan', 'Minnesota', 'Missouri', 'North Dakota', 'Nebraska', 'Ohio', 'South Dakota', 'Wisconsin'];
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

const $form = $('form');
const $inputRegion = $("#region");

let festivalData;

$form.on('submit', handleGetData);

function handleGetData(event) {
    event.preventDefault();    
    const region = $inputRegion.val();

    $.ajax(`${EDM_TRAIN_BASE_URL}/api/events?festivalInd=true&client=${EDM_TRAIN_API_KEY}`).then(function(data) {
        festivalData = data;
        // transform using .entries to more easily access data
        let festDataTransformed = Object.entries(festivalData['data']);
        // iterate through the data with forEach
        festDataTransformed.forEach(function() {
            let currentFest = festDataTransformed.shift();
            let currrentState = currentFest[1]['venue']['state'];
            // append to page if conditions are met
            if (region === 'Midwest') {
                if (midwestArray.includes(currrentState)) {
                    appendEvent();
                }
            }
            if (region === 'Northeast') {
                if (northeastArray.includes(currrentState)) {
                    appendEvent();
                }
            }
            if (region === 'South') {
                if (southArray.includes(currrentState)) {
                    appendEvent();
                }
            }    
            if (region === 'West') {
                if (westArray.includes(currrentState)) {
                    appendEvent();
                }
            } 
            if (region === 'all US') {
                if (allUSArray.includes(currrentState)) {
                    appendEvent();
                }
            }      
            if (region === 'other') {
                if (allUSArray.includes(currrentState) === false && currentFest[1]['venue']['location'] !== 'Virtual')  {
                    appendEvent();
                } 
            } 

            function appendEvent(){
                let currentFestBeingAddedNow =
                $(`<tr>
                <td>${currentFest[1]['name']}</td>
                <td>${currentFest[1]['venue']['location']}</td>
                <td>${currentFest[1]['date']}</td>
                <td>  <a href=${currentFest[1]['link']} target="_blank"> <i class="fas fa-external-link-alt"></i></a></td>
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