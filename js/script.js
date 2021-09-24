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

const $year = $('#year');
const $btnSelect = $('.btn-select');

let festivalData;
let currentRegionSelection;


// shade the currently selected button, unshade others, get current state
$btnSelect.on('click', function() {
    $btnSelect.removeClass('btn-current-select');
    $(this).addClass('btn-current-select');
    currentRegionSelection = ($(this).attr("value"));
  });

// start main ajax function
$btnSelect.on('click', handleGetData);

//reset data
function resetForm() {
    $("table").find("tr:gt(0)").remove();
};

function handleGetData(event) {
    event.preventDefault();  
    // removes currently displayed data if applicable.
    resetForm(); 

    const region = currentRegionSelection;

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
                <td> &nbsp<a href=${currentFest[1]['link']} target="_blank"> <i class="fas fa-external-link-alt"></i></a></td>
                </tr>`)
                $('tbody').append(currentFestBeingAddedNow);
            }

        })

        }, function(error) {
        console.log(error);
        })
    }

    init();
    function init() {
        $year.text(new Date().getFullYear());
    }
     
});