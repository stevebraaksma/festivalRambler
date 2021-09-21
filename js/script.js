// IIFE
$(function(){


const BASE_URL = 'https://edmtrain.com';
const API_KEY = 'df0b827a-3ec6-494d-b53e-b6d72191cc6f';
let festivalData;


// startDate=2017-01-01&

    // https://edmtrain.com/api/events?festivalInd=true&client=df0b827a-3ec6-494d-b53e-b6d72191cc6f

const $outputFestName = $('#output-fest');
// need to add the other outputs here, but first test

    const $form = $('form');
    
    const $inputDriveStart = $('input[id="drive-start"]');

    const $inputMaxDrive = $('select[id="max-drive"]');
    //  the above could also be written as:
    // const $inputMaxDrive = $("#max-drive");
    // may want to clean up everything to that shorter form

    const $inputStartDate = $('input[id="start-date"]');
    const $inputEndDate = $('input[id="end-date"]');
 

    
    $form.on('submit', handleGetData);
    
    
    function handleGetData(event) {
        event.preventDefault();    

        const driveStart = $inputDriveStart.val();
        console.log(driveStart);

        const maxDrive = $inputMaxDrive.val();
        console.log(maxDrive);

        const startDate = $inputStartDate.val();
        console.log(startDate);

        const endDate = $inputEndDate.val();
        console.log(endDate);



        $.ajax(`https://edmtrain.com/api/events?festivalInd=true&endDate=2021-11-25&client=df0b827a-3ec6-494d-b53e-b6d72191cc6f`).then(function(data) {
            console.log(data);
            festivalData = data;
            console.log(festivalData);
            // render();
            console.log(festivalData.data.name);


            console.log(festivalData.data[0].name);

            console.log(festivalData['data'][20]);
            // the above returns the full event array
            console.log(festivalData['data'][20]['name']);

            let mrKey = Object.entries(festivalData['data']);
            console.log(mrKey.length);
            // correctly returns 153 as the length, yay!!!
            let mrCounter = 5;
            console.log(mrKey);
            console.log(mrKey[5]);
            console.log(mrKey[5][1]);
            console.log(mrKey[5][1]['name']);
            console.log(mrKey[mrCounter][1]['name']);


            
            mrKey.forEach(function() {
                let thisIsTheOne = mrKey.pop();
                console.log(thisIsTheOne);
                let currentFestBeingAddedNow =
                $(`<tr>
                <td>${thisIsTheOne[1]['name']}</td>
                <td>${thisIsTheOne[1]['venue']['location']}</td>
                </tr>`)
                $('tbody').append(currentFestBeingAddedNow);
            })

        }, function(error) {
        console.log(error);
        })
    }

    function render() {
        $outputFestName.text(`${festivalData.data[0].name}`);
        $outputFestName.text(festivalData.data[0].name);


        console.log($outputFestName);
    }


});